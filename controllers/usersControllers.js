const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get user by id
module.exports.getUser = async (req, res) => {

    const userId = req.params.id
    const sql = 'SELECT * FROM users WHERE id = ?';
    db.query(sql, userId, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};
//Get all users
module.exports.getAllUsers = async (req, res) => {

    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Login user
module.exports.loginUser = async (req, res) => {

    const {username, password} = req.body;

    //Check if username exists
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, username, async (err, rows) => {

        if(err || !rows.length) return res.status(400).json({ error: "User does not exist" });
        // return res.status(200).json({});

        // if(!rows.length) return res.status(400).json({ error: "User does not exist" });

        // Check password
        const validPassword = await bcrypt.compare(password, rows[0].Password);
        if(!validPassword) return res.status(400).json({ error: "Password is not valid" });
        
        // Create token
        const token = await jwt.sign({ Id: rows[0].id}, TOKEN_SECRET);
        // res.header('Authorization', token);
        // req.session.user = rows;

        return res.status(200).json(token);

    });

};

//Create user
module.exports.createUser = async (req, res, next) => {

    const {username, email, password} = req.body;
    //Check if user exists
    const sql = 'SELECT * FROM users WHERE username = ? ';
    db.query(sql, username, async (err, row) => {

        if(err) {
            // console.log('err', err);
            return res.status(400).json({ error: err.sqlMessage });
        }else if(row.length) {
            // console.log('err', err);
            return res.status(400).json({ message: "User name already exists"});
        } else {
            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //Create a user
            const users = {
                "username": username,
                "email": email,
                "password": hashedPassword
            }

            //Create user
            db.query("INSERT INTO users SET ?", users, async (err, result) => {
                if(err) return res.status(400).json({ error: err.sqlMessage });

                return res.status(200).json(result);

            });
        }
        // req.session.user = rows;

        // return res.status(200).json(rows);

    });

};

//Update user
module.exports.editUser = async (req, res) => {

    const id = req.params.id;
    let user = req.body;
    const sql = 'UPDATE users SET ?  WHERE id = ?';
    db.query(sql, [req.body, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};

//Delete user
module.exports.deleteUser = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
