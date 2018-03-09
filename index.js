var shell=require('shelljs')
var args=[]
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
shell.exec(` echo "var mongoose = require('mongoose');
/*add you connection somewhere here*/
mongoose.connect('mongodb://localhost/${project}', {promiseLibrary: global.Promise});
" >> ${project}/models/index.js`);
shell.echo("creating script and style");
shell.touch(`${project}/public/scripts/app.js`);
shell.touch(`${project}/public/scripts/app.js`);
shell.touch(`${project}/public/styles/style.css`);
shell.echo("server .js");
shell.touch(`${project}/server.js`);
shell.echo("making json package");
shell.touch(`${project}/pachage.json`);
shell.exec(`echo '{
  "name": "${project}",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.2",
    "mongoose": "^5.0.9",
    "nodemon": "^1.17.1",
    "body-parser": "^1.18.2"
  }
}'>> ${project}/package.json`);
shell.echo('basic server.js');
shell.exec(`echo "var express=require('express');
var app=express();
var db=require('./models/index.js');
app.get('/',function(req,res){
  console.log('do you stuff here')
  });


app.listen(3000,function(){
  console.log('server running');
});" >> ${project}/server.js`);
shell.exec(`cd ${project}/ && npm install`);
shell.exec(`echo "node_modules" >> .gitignore`);
shell.exec(`git init && git add -A && git commit -m 'initialized project ${project}'`);
shell.echo(`echo "project created run cd ${project} no need to run npm isntall I already did that for you";`)
}else{
  shell.echo("project already exists")
}
}else{
  console.log("please enter a name for your project")
}

}
