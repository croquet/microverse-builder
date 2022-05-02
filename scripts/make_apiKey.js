#! /usr/bin/env node

const fs = require('fs');
const fileName='./apiKey.js';
const text='const apiKey = "' + process.env.CROQUET_APIKEY +'";\n' +
           'const appId = "' + process.env.CROQUET_APPID + '";\n' +
           'export default {apiKey, appId};\n';

fs.writeFile(fileName, text, function(err) {
        if (err) throw err; 
        console.log('apiKey.js created successfully.');
});
