const router = require("express").Router();
const pool = require('../db');
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization")


router.post("/registration", async (req, res) => {
    //1. destructure the req.body

    const { name, password} = req.body
    console.log(name, password)
    try{

        //2. check if user exist

        const user = await pool.query(
            " SELECT * FROM users WHERE user_name = $1", 
            [name]
        )

        if(user.rows.length > 0){
            return res.status(401).send("User alredy exist");
        }
        //3. Bcrypt the user password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        //4. Enter the new user inside db

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *", 
            [name, bcryptPassword]
        );
        
        //5. generating jwt token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error")
    }
});

//login route

router.post("/login", async (req, res) => {
    try{

        //1. destructure req.body

        const { name, password} = req.body;

        //2. check if user doesn't exist

        const user = await pool.query(
            "SELECT * FROM users WHERE user_name = $1",
            [name]
        );
        if (user.rows.length === 0){
            return res.status(401).json("Password or Name incorrect");
        }
        //3. check if incommin password is the same database password

        const validPassword = await bcrypt.compare(
            password, 
            user.rows[0].user_password
        );

        if(!validPassword){
            return res.status(401).json("Password or Name incorrect");
        }
        //4. give them the jwt token

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });
    } catch(err){
        console.error(err)
    }
})

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;