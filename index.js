#!/usr/bin/env node
var shell=require('shelljs');
shell.config.silent = true; // Don't let echo print to the terminal
var args=[];
var types=["String","Number","Boolean","Date"];
function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
process.argv.forEach(function (val, index, array) {
  args.push(val);
});
if(args[2] == 'new'){
  if(args[3]){
  var project=args[3];
  shell.echo ("creating new project" );
if ( shell.mkdir(project)){
  shell.echo("making basinc structer /views && /models && /public");
  shell.mkdir(`${project}/views`,`${project}/public`,`${project}/public/scripts`,`${project}/public/styles`,`${project}/models`);
  shell.echo("creating a models/index.js")
shell.echo(`var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/${project}', {promiseLibrary: global.Promise},function(error,success){
  if(error) console.log(error);
      console.log("connection successful");
      });
`).toEnd(`${project}/models/index.js`);
shell.echo("creating script and style");
shell.touch(`${project}/public/scripts/app.js`);
shell.touch(`${project}/public/scripts/app.js`);
shell.touch(`${project}/public/styles/style.css`);
shell.echo("server.js");
shell.touch(`${project}/server.js`);
shell.touch(`${project}/seed.js`);
shell.echo("making json package");
shell.touch(`${project}/package.json`);
let obj =shell.echo( `{
  "name": "${project}",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo 'Error: no test specified' && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.2",
    "mongoose": "^5.0.9",
    "nodemon": "^1.17.1",
    "body-parser": "^1.18.2"
  }
}`).toEnd(`${project}/package.json`);
shell.echo('basic server.js');
shell.echo(`var express=require('express');
var app=express();
var db=require('./models/index.js');
var bodyParser = require('body-parser');

// Configure app
app.set('views', __dirname + '/views');      // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body

// Set CORS Headers
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//basic root route
app.get('/',function(req,res){
  res.json({"msg":"server is running"})
});



app.listen(process.env.PORT || 3000,function(){
  console.log('server running');
});`).toEnd(`${project}/server.js`);
shell.echo(`var db=require('./models/index.js');`).toEnd(`${project}/seed.js`);
shell.echo(`web: node server.js`).toEnd( `${project}/Procfile`);
shell.exec(`cd ${project}/ && npm install`);
shell.echo(`node_modules`).toEnd(`${project}/.gitignore`);
shell.exec(`cd ${project}/ && git init && git add -A && git commit -m 'initialized project ${project}'`);
shell.echo(`project created run cd ${project} no need to run npm isntall I already did that for you`)

}else{
  shell.echo("project already exists")
}
}else{
  console.log("please enter a name for your project")
}
}else if( args[2] == '-g') {
	if(args[3] =='model'){
  var i=5;
  var model=cap(args[4]);
  var lol = shell.echo("woow");
  shell.echo(`creating model ${model}` );
  shell.echo(`var mongoose = require('mongoose');
var Schema = mongoose.Schema;

${model}Schema = new Schema({`).toEnd(`models/${model}.js`);
  for (i;i<args.length-1;i++){
	var option=args[i].split(':');
	option[1] = option[1] || 'String';
	option[1]=  (types.includes(cap(option[1]))) ? cap(option[1]) : 'String';

    shell.echo(`${option[0]}:${option[1]},`).toEnd(`models/${model}.js`);
  }
	var option=args[i].split(':');
	option[1] = option[1] || 'String';
	option[1]= (types.includes(cap(option[1]))) ? cap(option[1]) : 'String';
  shell.echo(` ${option[0]}:${option[1]}`).toEnd(`models/${model}.js`);
  shell.echo(`});
var ${model} = mongoose.model('${model}', ${model}Schema);
module.exports = ${model};`).toEnd(`models/${model}.js`);
shell.echo(` /* adding model ${model} to index.js */
module.exports.${model} = require('./${model}');`).toEnd(`models/index.js`);

}else
console.log("wrong entry you may use -g model or -g controller")
}
else{
  console.log("wrong entry");
}
