var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))
const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

app.post("/sign_up",(req,res) => {
    var name= req.body.sname
    var fname = req.body.fname
    var mname= req.body.mname
    var DOB= req.body.DOB
    var gender=req.body.gender
    var address= req.body.address
    var appid= req.body.appid
    var password= req.body.password
    var repassword = req.body.repassword
    var course= req.body.course
    var marks1= req.body.marks1
    var marks2= req.body.marks2
    var jee= req.body.jee

    var data={
        "name":name,
        "fname":fname,
        "mname":mname,
        "gender":gender,
        "DOB" :DOB,
        "address":address,
        "appid" : appid,
        "password":password,
        "repassword" : repassword,
        "course" : course,
        "marks1" : marks1,
        "marks2" : marks2,
        "jee" : jee
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})
app.post("/sign_up1",(req,res) => {
    var name= req.body.name
    var gender= req.body.gender
    var dob= req.body.dob
    var email=req.body.email
    var number= req.body.number
    var gender= req.body.gender
    var address= req.body.address
    var password= req.body.password
    var cpassword = req.body.cpassword
    

    var data={
        "name": name,
        "gender" : gender,
        "dob":dob,
        "email":email,
        "number":number,
        "gender":gender,
        "address":address,
        "password":password,
        "cpassword" : cpassword
        
    }
    db.collection('signup').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('home.html')
})
app.post("/login", async (req, res) => {
    var name = req.body.name
    var password = req.body.password
    var data = {
        "name" : name,
        "password" : password
    }
    
    /*if (req.method === "GET") {
      res.render("login.html");
    } else if (req.method === "POST") {*/
      try {
        const check = await db.collection('signup').find({});
        
        if (check.password === password) {
            return res.redirect('home.html')
        } else {
           return res.redirect('home.html')
          //console.log("Wrong Password!");
        }
      } catch {
        res.send("Wrong Details!");
        

      }
    //}
  });

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('sign.html')
}).listen(3000);

console.log("Listening on port 3000")