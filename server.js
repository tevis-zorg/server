//Modules source
const http = require('http');
const port_address = 8080;
const fs = require('fs');
const _ = require('lodash');//common practice is just using "_" for naming

const dummy_server = http.createServer((req, res) => {
    // console.log(req.url, req.method);//just on the console. not display anything on the browser.
    const rand_num = _.random(0,20);
    console.log(rand_num);
    const greet = _.once(() => {
        if(rand_num <= 15) {
            console.log(`It's number ${rand_num}`);
        }
    })
    
    greet();
    
    res.setHeader('Content-type', 'text/html');
    
    //figure out the path that user visited
    
    let path ='./views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        
        case '/about' :
            path += 'about.html';
            res.statusCode = 200;
            break;
            
        case '/about-me' :
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;// 7.3.3(a)
            
        default:
            path += '404.html';
            res.statusCode = 404;// Try to comment this. 7.3
            break;
    }
        
    fs.readFile(path , (err, data) => {
        if (err) {
            console.log(err);
            res.end(); //to stop the response hang up.
        } else {
            // res.write(data);//
            res.end(data);// if only using one data source
            // res.statusCode(200);// it will result the same for every response.
        }
    })
});

dummy_server.listen(port_address, 'localhost', () => {
    console.log(`listening for request on port : ${port_address}`);
});