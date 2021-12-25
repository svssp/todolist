const express = require('express');
const ejs = require('ejs');
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
var path=require('path')


app=express()
app.use(express.static(__dirname+'/static'))
app.use(favicon(path.join(__dirname, 'static', 'imgs','favicon.ico')))


const MongoURL="mongodb://localhost:27017/todolistdb"
mongoose.connect(MongoURL,{useNewUrlParser:true})

const activitySchema={
  activity:String
}

const activity=mongoose.model("activity",activitySchema);

var todolist=new Array()

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  var day=new Date()
  activity.find(function(err,data){
    if(err)
    console.log(err)
    else {
      res.render("todolist",{day:day.toLocaleString(),activities:data})
    }
  })
})

app.post("/",function(req,res){

  var temp=new activity({activity:req.body.activity})
  temp.save()
  res.redirect("/")

})

app.post("/delete",function(req,res){
  activity.deleteOne({_id:req.body.activity},function(err){
    if(err)
    res.send(err)
    else {
      res.redirect("/")
    }
  })
})

app.listen(process.env.PORT||4000,function(){
  console.log("server running ........");
})
