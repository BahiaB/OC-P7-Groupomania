
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
        imageurl:`${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
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
       `SELECT post.id AS post_id, post.imageurl, user.imageProfile AS post_imageurl, post.message, post.datecreation, post.user_id AS post_user_id, user.firstName, COUNT(likes.post_id) AS total_like FROM post JOIN user ON post.user_id = user.UID  LEFT JOIN likes ON post.id = likes.post_id GROUP BY post.id ORDER BY datecreation DESC;`;
      //"SELECT  post.id AS post_id, post.imageurl AS post_imageurl, post.message, post.datecreation, post.user_id as post_user_id, user.firstName  FROM post JOIN user ON post.user_id = user.UID  ORDER BY datecreation DESC;";
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
    const sql = `SELECT comments.id, comments.user_id, comments.post_id, comments.comment, user.firstName FROM comments JOIN user ON comments.user_id = user.UID WHERE post_id = ${req.params.id} ;`;
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


exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    const userId = req.auth.userId;
    console.log("par ici")
        const sql = `DELETE  FROM comments WHERE comments.id = ${commentId};`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            else {
                return res.status(200).json("commentaire suprimé");
            }

        }
        )
    }
    

exports.addLike = (req, res, next) => {
    console.log("req body addlike", req.body)
    let a = 0
    const sql = ` SELECT * FROM likes WHERE user_id = '${req.body.user_id}' AND post_id = ${req.body.post_id}`
    db.query(sql, async (err, result) => {
        if (err)
        {
            console.log("err addlike",err)
            throw err
        }
        else if (result.length === 0) {
            console.log("ici")
            const sql = `INSERT INTO likes SET ?`
            const newLike = {
                user_id: req.body.user_id,
                post_id: req.body.post_id
            }
            db.query(sql, newLike, (err, result) => {
                if (err)
                    throw err
                else
                    return res.status(200).json(result)
            })
        }
        else {
            const sql = `DELETE FROM likes WHERE user_id = '${req.body.user_id}' AND post_id = ${req.body.post_id}`
            db.query(sql, async (err, result) => {
                if (err)
                    throw err
                res.status(200).json()
            })
        }
    })
}
