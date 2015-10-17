var http = require('http');

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

http.createServer(function (request, response) {
  // To Read a Cookie
    var cookies = parseCookies(request);
    console.log('JSON = ' + JSON.stringify(cookies)+"\n"); 
    setCookies=[];
    console.log("Reading Cookie ::  count="+(cookies.count)+"\n");
    if(cookies.count!=undefined) {
     var count=parseInt(cookies.count);
     count = count+1;
     setCookies.push("count="+count);
    } else {
     var count=0;
     var dummy="something";
     setCookies.push("count="+count);
     setCookies.push("dummy="+dummy);
    }
    // To Write a Cookie
    response.setHeader("Set-Cookie",setCookies);
    //console.log("Response SetCookie String : "+response.headers.cookie+"\n"); 
    response.end('Hello World\n The Count is ' + count);
 }).listen(3000);

   console.log('Server running at http://localhost:3000/');
