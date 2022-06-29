
//const fs = require("fs");
const jwt = require("jsonwebtoken");
const dbc = require("../db");

const db = dbc.getDB();

exports.createPost = (req, res, next) => {

    console.log(req.body);
   // console.log(req.auth.userId);
    const newPost = {
        user_id: `${req.auth.userId}`,
        message: req.body.message,
        postUserName: req.body.postUserName,
        imageurl: null,
    };
    const sql = "INSERT INTO post SET ?";
    db.query(sql, newPost, (err, result) => {
        if (err) {
            //console.log(err);
            throw (err);
        }

        res.status(200).json({ message: "Le post a été crée" })
    });
};

exports.getAllPosts = (req, res, next) => {

    const sql =// "SELECT * FROM  post";
        "SELECT  post.id AS post_id, post.imageurl AS post_imageurl, post.message, post.datecreation, post.user_id as post_user_id, user.firstName  FROM post JOIN user ON post.user_id = user.UID  ORDER BY datecreation DESC;";

    db.query(sql, (err, result) => {

        // console.log("result:", result)
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};





exports.updatePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.auth.userId; // ID du token
    const sql = `UPDATE post SET ? WHERE id= '${postId}'`;
    //const user_id = req.params.user_id;
    const user_post_id = "SELECT * FROM user WHERE UID= ?;";
   // console.log("userid:", userId)
    db.query(user_post_id, userId, (err, result) => {
        if (err) {
            console.log(err)
            throw err;
        }
       // console.log(result[0]);
        if (userId === `${result[0].UID}`) {
            const postUpdated = {
                user_id: `${req.auth.userId}`,
                message: req.body.message,
            }
            db.query(sql, postUpdated, (err, result) => {
                if (err) {
                    console.log(err);
                    throw (err);
                }
                res.status(200).json({ message: "post modifié!" });

            })

        }
    })

};

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.auth.userId;
    
        const sql = `DELETE  FROM post WHERE post.id = ${postId};`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            else {
                return res.status(200).json("post suprimé");
            }

        }
        )
    }
    


exports.getComments = (req, res, next) =>{
    const sql = `SELECT *, user.firstName FROM comments JOIN user on comments.user_id = user.UID WHERE post_id = ${req.params.id} ;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        else {
            return res.status(200).json(result );
        }

    })
}

exports.createComment = (req, res, next) =>{
    
    const post_id= req.body.postId;
    const newComment = {
        user_id: `${req.auth.userId}`,
        comment: req.body.comment,
        post_id : post_id,
     
    };
    const sql = "INSERT INTO comments SET ? ";
    db.query(sql, newComment, (err, result) => {
        if (err) {
            console.log("error");
            throw (err);
        }

        res.status(200).json({ message: "Le post a été crée" })
    });
}
    
