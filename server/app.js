
const bcrypt = require("bcryptjs");
const express = require('express');
const cors = require('cors');
require("./db/conn");
const app = express();
const port = process.env.PORT || 8000;
const Mess = require("./models/register");
const Register = require("./models/studentregister");
const MessMenu = require("./models/menu");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.get("/", (req, res) => {
//     res.render("index");
// })
//variables
let user;

// app.get("/messregister", (req, res) => {
//     res.render('messregister');
// })
// app.get("/studentregister", (req, res) => {
//     res.render('studentregister');
// })
// app.get("/studentlogin", (req, res) => {
//     res.render('studentlogin');
// })
// app.get("/messlogin", (req, res) => {
//     res.render('messlogin');
// })
// app.get("/studentpage", (req, res) => {
//     res.render('studentpage');
// })

app.get('/',(req,res)=>{
    res.send("hello");
})

app.post("/studentregister", async (req, res) => {
    //console.log(hello);
    const {email,firstname,lastname,password,rollnumber} = req.body;
    if(!firstname || !lastname || !email || !rollnumber || !password){
        return res.status(422).json({error:"please fill all the fields"});
    }
    try {
        // console.log(req.body.firstname);
        const userexist = await Register.findOne({email:email});
        if(userexist){
            return res.status(422).json({error:"user already exists"});
        }
        else{const registerStudent = new Register({
            firstname: firstname,
            lastname: lastname,
            email: email,
            rollnumber: rollnumber,
            password: password
            // attendence: 0

        })
        const registered = await registerStudent.save();}
        res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/messregister", async (req, res) => {
    
    const {email,firstname,lastname,password} = req.body;
    if(!firstname || !lastname || !email || !password){
        return res.status(422).json({error:"please fill all the fields"});
    }
    try {
        // console.log(req.body.firstname);
        const userexist = await Mess.findOne({email:email});
        if(userexist){
            return res.status(422).json({error:"user already exists"});
        }
        else{const registerMess = new Mess({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
            // attendence: 0

        })
        const registered = await registerMess.save();}
        res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/messlogin", async (req, res) => {
    const {email,password}=req.body;
    if( !email || !password){
        return res.status(422).json({error:"please fill all the fields"});
    }
    try {
        const useremail = await Mess.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, useremail.password);
        if (ismatch) {
            console.log("helo ")
           res.status(201).json({message:"user logged in successfully"});
            // res.status(201).render("studentpage");

        } else {
             res.status(422).json({error:"invalid email or password"});
        }
    } catch (err) {
        res.status(422).json({error:"please fill all the fields"});
    }

})
app.post("/studentlogin", async (req, res) => {
    const {email,password}=req.body;
    if( !email || !password){
        return res.status(422).json({error:"please fill all the fields"});
    }
    try {
        const useremail = await Register.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, useremail.password);
        if (ismatch) {
            console.log("helo ")
           res.status(201).json({message:"user logged in successfully"});
            // res.status(201).render("studentpage");

        } else {
             res.status(422).json({error:"invalid email or password"});
        }
    } catch (err) {
        res.status(422).json({error:"please fill all the fields"});
    }
})

app.post('/studentattendance', async (req, res) => {
    try {
        console.log("hi");
        const update = await Register.findOneAndUpdate({ email: user }, { $inc: { __v: 1 } });
        console.log("hello");
        if (update) {
            // res.status(201).render("index");
        }
        else {
            console.log("hello");
            // res.status(400).render("error");
        }

    }
    catch (err) {
        console.log("hello this i sme ")
        // res.status(400).render("error");
    }
})

app.post('/messpage', async (req, res) => {
    try {
        const aval = req.body.fooditem;
        const quantity = req.body.quantity;
        const update = await MessMenu.findOne({ fooditem: aval });
        if (update) {
            const updated = await MessMenu.findOneAndUpdate({ fooditem: aval }, { quantity: quantity });
            // res.status(201).render("index");
        }
        else {
            const Messmenu = new MessMenu({
                fooditem: aval,
                quantity: quantity
            })
            const menu = await Messmenu.save();
        }

    }

    catch (err){
        // res.status(400).render("error");
    }
})
app.listen(port, () => {
    console.log('server is running on port ' + port);
})