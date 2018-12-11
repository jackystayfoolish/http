const http=require('http')
const fs=require('fs')

http.createServer(function(request,response){
    console.log('request come',request.url)
    const html=fs.readFileSync('test.html','utf8')
    const img=fs.readFileSync('test.jpg')
    if(request.url==='/'){
        response.writeHead(200,{
            'Content-Type':'text/html'
        })
        response.end(html)
    }else{
        response.writeHead(200,{
            'Content-Type':'image/jpg'
        })
        response.end(img)
    }
    
    
    
}).listen(8889)

console.log('server listen on 8889')