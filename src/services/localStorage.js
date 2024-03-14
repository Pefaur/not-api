export function getPort() {
    const port = localStorage.getItem('port');
    return port ? port : 5010;
}

export function setPort(port) {
    localStorage.setItem('port', port);
}