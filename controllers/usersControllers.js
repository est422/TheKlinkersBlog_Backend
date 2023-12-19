const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get user by id
module.exports.getUser = async (req, res) => {

    try{
        const userId = req.params.id
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, userId, (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            return res.status(200).json(result);
        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};
//Get all users
module.exports.getAllUsers = async (req, res) => {

    try{
        const sql = 'SELECT * FROM users';
        db.query(sql, (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            return res.status(200).json(result);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};

//Login user
module.exports.loginUser = async (req, res) => {

    try{
        const {username, password} = req.body;
        const expirationTime = Math.floor(Date.now() / 1000) + 15 * 60;
        //Check if username exists
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, username, async (err, rows) => {

            if(err || !rows.length) return res.status(400).json({ error: "User does not exist" });
            // return res.status(200).json({});

            // if(!rows.length) return res.status(400).json({ error: "User does not exist" });

            // Check password
            const validPassword = await bcrypt.compare(password, rows[0].password);
            if(!validPassword) return res.status(400).json({ error: "Password is not valid" });
            
            // Create token
            const token = jwt.sign({ Id: rows[0].id }, TOKEN_SECRET, { expiresIn: expirationTime });
            // res.header('Authorization', token);
            // req.session.user = rows;

            // res.cookie('token', token);
            // return res.status(200).json({Success: 'Success'});
            return res.status(200).json(token);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};

//Create user
module.exports.createUser = async (req, res, next) => {

    try{
        const {username, password} = req.body;
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
    } catch(e) {
        return res.status(500).json({error: e});
    }

};

//Update user
module.exports.editUser = async (req, res) => {

    try{
        const id = req.params.id;
        let user = req.body;
        const sql = 'UPDATE users SET ?  WHERE id = ?';
        db.query(sql, [req.body, id], (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            res.status(200).json(result);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};

//Delete user
module.exports.deleteUser = async (req, res) => {

    try{
        const id = req.params.id;
        const sql = 'DELETE FROM users WHERE id = ?';
        db.query(sql, id, (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            res.status(200).json(result);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};
