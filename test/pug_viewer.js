const pug = require("pug");
const http = require("http");
const fs = require("fs");

var params = process.argv.slice(2)

const TemplateFile = params[0];
const TestParams = JSON.parse(params[1] ? params[1] : "{}");
var compiled = pug.compileFile(TemplateFile)(TestParams);

fs.watchFile(TemplateFile, {}, (curr, prev) => {
    compiled = pug.compileFile(TemplateFile)(TestParams);
})

http.createServer((req, res) => {
    if (req.url == "/") {
        res.end(compiled);
    }
}).listen(3000)

console.log("Test server listening on http://localhost:3000")