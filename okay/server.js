var express=require('express');
var app=express();
var db=require('./models/index.js');
app.get('/',function(req,res){
  console.log('do you stuff here')
  });


app.listen(3000,function(){
  console.log('server running');
});
