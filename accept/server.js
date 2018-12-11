const http=require('http')
const fs=require('fs')
const zlib=require('zlib')

http.createServer(function(request,response){
    console.log('request come',request.headers.host)
    if(request.url==='/'){
        const html=fs.readFileSync('test.html')
        response.writeHead(200,{
            'Content-Type':'text/html',
            'Content-Encoding':'gzip'
        })
        response.end(zlib.gzipSync(html))
    }
    
}).listen(8889)

console.log('server listen on 8889')