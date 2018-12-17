const http=require('http')
const fs=require('fs')
const zlib=require('zlib')

const wait=(seconds)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },seconds*1000)
    })
}

http.createServer(function(request,response){
    console.log('request come',request.headers.host)
    if(request.url==='/'){
        const html=fs.readFileSync('test.html','utf-8')
        response.writeHead(200,{
            'Content-Type':'text/html',
        })
        response.end(html)
    }
    if(request.url==='/data'){
        response.writeHead(200,{
            'Cache-Control':'max-age=20',
            // 'Cache-Control':'max-age=5,s-maxage=20',
        })
        wait(2).then(()=>{
            response.end('success')
        })
    }
    if(request.url==='/test-vary'){
        const html=fs.readFileSync('test-vary.html','utf-8')
        response.writeHead(200,{
            'Content-Type':'text/html',
        })
        response.end(html)
    }
    if(request.url==='/data-vary'){
        response.writeHead(200,{
            'Cache-Control':'s-maxage=20',
            'Vary':'X-Test-Cache'
        })
        wait(2).then(()=>{
            response.end('success')
        })
    }

    
}).listen(8889)

console.log('server listen on 8889')