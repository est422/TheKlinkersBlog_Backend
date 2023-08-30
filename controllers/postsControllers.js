const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get post by id
module.exports.getPost = async (req, res) => {

    const postId = req.params.id
    const sql = 'SELECT * FROM post WHERE postId = ?';
    db.query(sql, postId, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};
//Get all posts
module.exports.getAllPosts = async (req, res) => {

    const sql = 'SELECT * FROM post';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Create post
module.exports.createPost = async (req, res, next) => {

    const {postTitle, postDescription} = req.body;
    
    //Create a post
    const post = {
        "postTitle": postTitle,
        "postDescription": postDescription
    }

    //Create post
    db.query("INSERT INTO post SET ?", post, async (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });

        return res.status(200).json(result);

    });

};

//Update post
module.exports.editPost = async (req, res) => {

    const id = req.params.id;
    let post = req.body;
    const sql = 'UPDATE post SET ?  WHERE postId = ?';
    db.query(sql, [req.body, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};

//Delete post
module.exports.deletePost = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM posts WHERE postId = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};

//Delete post
module.exports.deletePost = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM posts WHERE postId = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
