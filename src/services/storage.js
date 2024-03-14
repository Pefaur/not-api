const storage = require('node-persist');


const storageInit = async () => {
    await storage.init({
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,  
        ttl: false,
        expiredInterval: 2 * 60 * 1000, 
        forgiveParseErrors: false,
        writeQueue: true, 
        writeQueueIntervalMs: 1000, 
        writeQueueWriteOnlyLast: true, 
    });
};

const udpateResponse = async (key, value) => storage.setItem(key, JSON.stringify(value));

const getResponse = async (key) => {
    const res = await storage.getItem(key) || false;
    if(res){
        return JSON.parse(res);
    }
    return { notExist: true, statusCode: 404, res: { message: "route not exist"} }
};

module.exports = { storageInit, udpateResponse, getResponse}