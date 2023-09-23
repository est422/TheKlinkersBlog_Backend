const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');


//Get post by id
module.exports.getPost = async (req, res) => {

    try{
        const postId = req.params.id
        const sql = 'SELECT * FROM post WHERE postId = ?';
        db.query(sql, postId, (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            return res.status(200).json(result);
        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};
//Get all posts
module.exports.getAllPosts = async (req, res) => {

    try{
        const sql = 'SELECT * FROM post';
        db.query(sql, (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            return res.status(200).json(result);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};

//Create post
module.exports.createPost = async (req, res) => {
    
    try{
        // var readFile = Buffer.from(req.body.postImage, 'base64');
        // const {postedBody} = req.body;
        const today = new Date().toISOString().slice(0, 10);
        const postImage = req.file.filename;
        // const postedDate = today.getDay();
        // console.log(today);
        // console.log('filename', postImage);

        //Create a post
        const post = {
            "postImage": postImage,
            "postTitle": req.body.postTitle,
            "postDescription": req.body.postDescription,
            "postCategory": req.body.postCategory,
            "postDate": today
        }

        //Create post
        db.query("INSERT INTO post SET ?", post, async (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });

            return res.status(200).json(result);

        });
    } catch(e){
        return res.status(500).json({ error: e });
    }

};

//Update post
module.exports.editPost = async (req, res) => {

    try{
        // console.log(`reqBody ${req}`);
        const id = req.params.id;
        let post = req.body;
        const sql = 'UPDATE post SET ?  WHERE postId = ?';
        db.query(sql, [req.body, id], (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            res.status(200).json(result);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};

//Delete post
module.exports.deletePost = async (req, res) => {

    try{
        const id = req.params.id;
        const sql = 'DELETE FROM post WHERE postId = ?';
        db.query(sql, id, (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            res.status(200).json(result);

        });
    } catch(e) {
        return res.status(500).json({error: e});
    }

};
