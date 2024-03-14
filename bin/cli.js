#! /usr/bin/env node
const fs = require('fs');
const path = require("path");
const express = require("express");
const cors = require('cors');
const open = require('open');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { delay } = require("../src/utils");
const { storageInit, udpateResponse, getResponse } = require('../src/services/storage');

const buildFolder  = path.join(path.dirname(fs.realpathSync(__filename)), '../build');

const args = process.argv.slice(2, process.argv.length);

const init = async (data, config, port = 5010) => {
    try {
        await initData(data);
        await initApi(data, config);
    } catch(err) {
        console.log('Error:', err);
    }
}

const getArg = (key) => {
   const index = args.indexOf(key);
   return index >= 0 ? args[index + 1] : null
} 

const dir = getArg('-d') || getArg('-dir') || '.fake-api';     // second argument
const port = getArg("-p") || getArg('-port') || 5010;
const origin = getArg("-o") || getArg('-origin') || null;

const initData = async (data) => {
    await storageInit();
    data.forEach(async (route) => {
        const { uri, method, responses } = route;
        const uriKey = uri + method;
        await udpateResponse(uriKey, responses[0]);
    });
}

const initApi = async (data, config) => {
    const app = express();
    const internalApp = express();
    app.use(express.json());
    app.use(express.static(buildFolder));

    internalApp.use(cors());
    
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, buildFolder, "index.html"));
    });

    const responseHandle = (key) => async (req, res) => {
        const response = await getResponse(key);
        // response delay
        await delay(response.delay);
        res.status(response.statusCode)
        res.json(response.response);
    }

    data.forEach(route => {
        const { uri, method } = route;
        const uriKey = uri + method;

        if(route.method === 'GET'){
            app.get(route.uri, responseHandle(uriKey));
        }
        if(route.method === 'POST'){
            app.post(route.uri, responseHandle(uriKey));
        }
        if(route.method === 'PUT'){
            app.put(route.uri, responseHandle(uriKey));
        }
        if(route.method === 'DELETE'){
            app.delete(route.uri, responseHandle(uriKey));
        }
    })


    internalApp.get("/fake-api/config/", (req, res) => {
        res.status(200)
        res.json({...config, 
            ...(port && { port }), 
            ...(origin && { origin })
        });
    });

    internalApp.get("/fake-api/config/data/", (req, res) => {
        res.status(200)
        res.json({
            data: data,
        });
    });

    // Change response
    app.post("/config/change/:key", async (req, res) => {   
        const key = decodeURIComponent(req.params.key);
        await udpateResponse(key, req.body);
        res.json({
            success: 'reponse changed',
            response: req.body
        });
    });

    if (origin) {
        const apiProxy = createProxyMiddleware({
            target: origin,
            changeOrigin: true,
            onProxyReq: async (proxyReq, req, res) => {
                const uriKey = req.path + req.method;
                const response = await getResponse(uriKey);
                if (response.notExist) {
                    // Si la respuesta existe en getResponse, cancela el proxy
                    proxyReq.abort();
                    // response delay
                    await delay(response.delay);
                    res.status(response.statusCode)
                    res.json(response.response);
                }
            },
        });
    
        app.use(apiProxy);
    }

    internalApp.listen(5022, () => {});

    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
        next();
    });

    app.listen(port, () => {
        console.log('\x1b[33m%s\x1b[0m', "============================================");  
        console.log('\x1b[33m', 'NotAPI started on:' ,'\x1b[0m', '\x1b[36m', `http://localhost:${port}` ,'\x1b[0m');
        console.log('\x1b[33m%s\x1b[0m', "============================================");  
        open(`http://localhost:${port}/`);
    });
};

const filesNames = fs.readdirSync(dir);
const filesData = filesNames.filter(e => e !== '.config.json');
const fileConfig = filesNames.find(e => e === '.config.json');
const config = fileConfig ? JSON.parse(fs.readFileSync(`${dir}/${fileConfig}`, 'utf8')) : {};
const data = filesData.map(file => JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf8')));
(async () => await init(data, config, port))();