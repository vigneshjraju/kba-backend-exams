const { log } = require('console');
const http=require('http');

const server=http.createServer((req,res)=>{
    console.log(`Recieved a ${req.method} request for ${req.url}`)

    res.writeHead(200,{"content-type":"text/plain"})

    res.end('hello,this is a basic server without middleware!' )
})

const PORT=3000;

server.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})