var express = require('express')
var app = express()
app.use('/app', express.static (__dirname + '/app/')); 
app.get('/*', function (req, res) {
  res.sendFile(__dirname+'/index.html');
})
 
app.listen(3000);
