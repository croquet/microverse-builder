const fs = require('fs');
const fileName='apiKey.js';
const apiKey=process.env.CROQUET_APIKEY;
const appId=process.env.CROQUET_APPID;

fs.writeFile(fileName, 'const apiKey = "' + apiKey + '";\nconst appId = "' + appId + '";\nexport default {apiKey, appId};', function(err) {
    if (err) throw err; 
    console.log('apiKey.js created successfully.');
});
