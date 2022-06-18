let http = require('http')
let server = http.createServer(handleRequest)
let host ="localhost"
let port = 5000
server.listen(port, host)
function handleRequest (req, res)
{
    console.log("The current client request is: "+ req.url)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write ("Hallo und los und nochmal los")
    res.end()
}
console.log('Server is running on ' + host + ':' + port)