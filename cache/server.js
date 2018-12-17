const http=require('http')
const fs=require('fs')

http.createServer(function(request,response){
    console.log('request come',request.url)
    if(request.url==='/cors'){
        const html=fs.readFileSync('cors.html','utf8')
        response.writeHead(200,{'Content-Type':'text/html'})
        response.end(html)
    }
    if(request.url==='/cache-maxage'){
        const html=fs.readFileSync('cache-maxage.html','utf8')
        response.writeHead(200,{'Content-Type':'text/html'})
        response.end(html)
    }
    if(request.url==='/maxage.js'){
        response.writeHead(200,{
            'Content-Type':'text/javascript',
            'Cache-Control':'max-age=20'
        })
        response.end('console.log("maxage script loaded")')
    }
    if(request.url==='/cache-maxage-nocache'){
        const html=fs.readFileSync('cache-maxage-nocache.html','utf8')
        response.writeHead(200,{'Content-Type':'text/html'})
        response.end(html)
    }
    if(request.url==='/maxage-nocache.js'){
        const etag=request.headers['if-none-match']
        if(etag==='777'){
            response.writeHead(304,{
                'Content-Type':'text/javascript',
                'Cache-Control':'max-age=2000000,no-cache',
                'Last-Modified':'123',
                'Etag':'777'
            })
            response.end('123')
        }else{
            response.writeHead(200,{
                'Content-Type':'text/javascript',
                'Cache-Control':'max-age=2000000,no-cache',
                'Last-Modified':'123',
                'Etag':'777'
            })
            response.end('console.log("maxage-nocache script loaded")')
        }
        
        
    }
    
}).listen(8888)

console.log('server listen on 8888')