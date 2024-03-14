const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCodeCURL = ({ uri, port, method, body = {} }) => {  
    return `curl --location --request ${method} 'http://localhost:${port}${uri}' \\
  --header 'Content-Type: application/json' \\`;
}
 
module.exports = { delay, getCodeCURL }