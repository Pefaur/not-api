import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResponseList from "./ResponseList";
import { green, grey, orange, purple, red } from "@mui/material/colors";
import { useState } from "react";
const { getCodeCURL } = require("../utils");

const getColor =  {
    "POST": purple[500],
    "GET": green[500],
    "PUT": orange[500],
    "DELETE": red[500]
};


const Card = (data) => {
    const { uriKey, method, title, description, expanded, handleChange, responses, port } = data;
    const [openToast, setOpenToast] = useState(false);

    const copiarEndpoint = (e, description) => {
        e.preventDefault();
        e.stopPropagation();
        navigator.clipboard.writeText(description);
        setOpenToast(true);
    };

    const copiarCURL = (e, url, method, body) => {
        const codeCURL = getCodeCURL({ port, uri: url, method, body });
        e.stopPropagation();
        navigator.clipboard.writeText(codeCURL);
        setOpenToast(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToast(false);
    };

    return (
        <>
            <Accordion expanded={expanded} onChange={handleChange}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Box
                        sx={{bgcolor: getColor[method] || grey[500]}} 
                        display="flex" 
                        justifyContent="center"
                        alignItems="center" 
                        borderRadius={2}
                        px={1}
                        height={30}
                        mr={2}
                    >
                        <Typography sx={{ fontWeight: 500, fontSize: 17, color: '#ffffff'}}>
                            {method}
                        </Typography>
                    </Box>
                
                    <Typography sx={{ flex: 1, flexShrink: 0, fontSize: 18 }}>
                        {title}
                    </Typography>
                    <div style={{ textAlign: 'right', 'padding-right': '15px' }}>
                        <Button onClick={(e) => copiarCURL(e, title, method, responses[0])}>Copiar CURL</Button>
                        <Button onClick={(e) => copiarEndpoint(e, description)}>Copiar Link</Button>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                <ResponseList port={port} responses={responses} uriKey={uriKey} />
                </AccordionDetails>
            </Accordion>
    
            <Snackbar
                open={openToast}
                autoHideDuration={1000}
                onClose={handleClose}  
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}      
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    ¡Copiado!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Card;