const http=require('http')
const fs=require('fs')

http.createServer(function(request,response){
    console.log('request come',request.url)
    if(request.url==='/'){
        const html=fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-Type':'text/html',
            'Content-Security-Policy':'script-src \'self\';form-action \'self\';report-uri /report'
        })
        response.end(html)
    }else{
        response.writeHead(200,{
            'Content-Type':'application/javascript'
        })
        response.end('console.log(1234)');
    }
    
}).listen(8889)

console.log('server listen on 8889')