#NodeJS Working with Cookies

##1. Introduction

In NodeJS `http` library has Access to the Header Component and Hence it can also access Cookies.

Reading Cookies from HTTP Headers and Writing our own cookies parsing function is most reliable than using currently existing Cookies related node packages.

##2. Reading and Parsing Cookies

###2.1 Require `http`

```js
var http = require('http');
```

The `http` has access to the `request` and `response` objects of the HTTP request.

From the `request` object we can read the already set `cookies` and other headers, while we can write the `response` headers to instruct the browsers to manipulate the cookies.

###2.2 Parsing Cookies

The entire existing (already set) cookies are stored in the `request.headers.cookie`.

The cookies we recieve is as follows :

```shell
cookie1=val1; cookie2=val2
```
Now let's try parsing the cookie string to JSON :

Steps :
1. Trim the Cookie String to get Key-Value pair by `split(';')`
2. Trim the Cookie by `split('=')`
3. Write each Key-Value pair to JSON

Parse Function :

```js
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
```
This parse function will enable read cookies flawlessly.

###2.3 Setting or Updating Cookies

We can easily set the cookies or update existing values by using `setHeader()` function.

Function to set cookies :

```js
response.setHeader('Set-Cookie',
+      ['cookie1='+valcookie1,
+       'cookie2'+valcookie2
+       ]);
```

NOTE : if we overwrite the `Set-Cookie`, the previous value will be lost, hence we need to read and append all cookies at the same time.

To overcome this issue, we can get the header cookie string `req.headers.cookie` and append the updated cookies to the trailing part of the Cookie string.

###2.4 Sample Cookie Set-Update.

Find the following code snippet to Set-Update cookies using the method as discussed above :

```js
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
  console.log('JSON = ' + JSON.stringify(cookies));
  setCookies=[];

  if(cookies!={}) {
    console.log(cookies.count+"\n");
    var count=parseInt(cookies.count);
    count = count+1;
    setCookies.push("count="+count);
  } else {
    var count=0;
    var dummy="something";
    setCookies.push("count="+count);
    setCookies.push("dummy+"+dummy);
  }


  // To Write a Cookie
  response.setHeader("Set-Cookie",setCookies);
  console.log(response.headers.cookie);
  response.end('Hello World\n The Count is ' + count);
}).listen(3000);

console.log('Server running at http://localhost:3000/');
```
