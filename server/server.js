import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';

//schema below
import User from './Schema/User.js';

//server setup + user authform routes

const server = express();
let PORT = 3000;

server.use(express.json());

mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
});

server.post("/signup", (req, res) => {

    let {fullname, email, password } = req.body;


    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    //validating the data from frontend

    if(fullname.length < 3) {
        return res.status(403).json({ "error": "Fullname must be at least 3 letters long" })
    }
    if(!email.length){
        return res.status(403).json({ "error": "Enter Email" })
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({ "error": "Email is invalid" })
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({ "error": "Password should be a 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"})
    }

    bcrypt.hash(password, 10, (err, hashed_password) => {

        let username = email.split("@")[0];
        
        let user = new User({
            personal_info: { fullname, email, password: hashed_password, username  }
        })

        user.save().then((u) => {
            return res.status(200).json({ user: u })
        })
        .catch(err => {
            return res.status(500).json({ "error": err.message })
        })

    })
})

server.listen(PORT, () => {
    console.log('listening on port => ' + PORT);
})