var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
if(process.env.NODE_ENV == 'prod'){
	var fbAppId = '906900819363038';
	var frontUrl = 'https://forums.qiku.com';
}else{
	var fbAppId = '906239946095792';
	var frontUrl = 'http://localhost:3000';
}
app.engine('handlebars', exphbs({}));
app.set('view engine', 'handlebars');
app.set('views','/');
app.engine('.html', exphbs({extname: '.html',layoutsDir:'/'}));
app.use('/app', express.static (__dirname + '/app/'));
//app.get('/robots.txt',function(req,res){res.render(__dirname+'/robots.txt',{layout:false})});
app.get('/*', function (req, res) {
  if('/robots.txt' === req.url){
    res.type('text/plain');
    res.send('User-agent: *\nDisallow:');
  }else{
    res.render(__dirname+'/index-'+process.env.NODE_ENV+'.html',{
      layout:false,
      fbAppId:fbAppId,
      frontUrl:frontUrl,
      env:process.env.NODE_ENV
    });
  }
});
 
app.listen(3000);
