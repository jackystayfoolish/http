const http=require('http')

http.createServer(function(request,response){
    console.log('request come',request.url)
    response.end('123')
}).listen(8889)

console.log('server listen on 8889')