
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dbc = require("../db");

const db = dbc.getDB();

exports.createPost = (req, res, next) => {

    //console.log(req.body);
    // console.log(req.auth.userId);
    let newPost = {}

    newPost = {
        user_id: `${req.auth.userId}`,
        //message: req.body.message,
        postUserName: req.body.postUserName,
    }
    if (req.body.message) {
        newPost = { ...newPost, message: req.body.message }
    }
    if (req.file) {
        newPost = { ...newPost, imageurl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
    }
    const sql = "INSERT INTO post SET ?";
    db.query(sql, newPost, async (err, result) => {
        if (err) {
            //console.log(err);
            throw (err);
        }

        res.status(200).json({ message: "Le post a été crée" })
    });
}

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


exports.getPostsFromUser = (req, res, next) => {
    const user = req.params.id

    //`SELECT post.id AS post_id, post.imageurl, user.imageProfile AS post_imageurl, post.message, post.datecreation, post.user_id AS post_user_id, user.firstName, COUNT(likes.post_id) AS total_like FROM post JOIN user ON post.user_id = user.UID  LEFT JOIN likes ON post.id = likes.post_id GROUP BY post.id ORDER BY datecreation DESC;`;
    const sql = `SELECT post.id AS post_id, post.imageurl, post.message, post.datecreation, post.user_id AS post_user_id, user.imageProfile AS post_imageurl, user.firstName, COUNT(likes.post_id) AS total_like FROM post LEFT JOIN user ON UID = ? LEFT JOIN likes ON post.id = likes.post_id WHERE post.user_id = ? GROUP BY post.id`
    db.query(sql, [user, user], async (err, result) => {
        if (err)
            throw err
        else {
            console.log(" user post", result)
            return res.status(200).json(result)
        }
    })
}

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    const userId = req.auth.userId;
    const sqlFile = "SELECT imageurl FROM post WHERE post.id =?"
    db.query(sqlFile, postId, (err, result) => {
        if (err) {
            throw (err)
        }
        if (result[0].imageurl) {
            const oldFileName = result[0].imageurl.split("/images/")[1];
            if (oldFileName) {
                fs.unlink(`images/${oldFileName}`, () => {

                    if (err) console.log("err delete image ", err);
                    else {
                        console.log("Ancienne image de posts supprimée");
                    }
                })
            }
        }
        const sql = `DELETE  FROM post WHERE post.id = ?;`;
        db.query(sql, postId, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
            else {
                return res.status(200).json("post suprimé");
            }
        })
    })
}


exports.getComments = (req, res, next) => {
    postId = req.params.id;
    const sql = `SELECT comments.id, comments.user_id, comments.post_id, comments.comment, user.firstName FROM comments JOIN user ON comments.user_id = user.UID WHERE post_id =?;`;
    db.query(sql, postId, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        else {
            return res.status(200).json(result);
        }

    })
}

exports.createComment = (req, res, next) => {

    const post_id = req.body.postId;
    const newComment = {
        user_id: `${req.auth.userId}`,
        comment: req.body.comment,
        post_id: post_id,

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
    const sql = `DELETE  FROM comments WHERE comments.id =?;`;
    db.query(sql, commentId, (err, result) => {
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
    userId = req.body.user_id;
    postId = req.body.post_id;
    let a = 0
    const sql = ` SELECT * FROM likes WHERE user_id = ? AND post_id = ?`
    db.query(sql, [userId, postId], async (err, result) => {
        if (err) {
            console.log("err addlike", err)
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

exports.modifyPost = async (req, res, next) => {
    const userId = req.auth.userId
    const postId = req.params.id
    const SqlOldFile = "SELECT imageurl FROM post WHERE post.id =?;"
    console.log(req.file)

    let updated = {}
    if (req.body.message) {
        updated = { ...updated, message: req.body.message }
    }
    if (req.file) {
        const new_post_image_url = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

        updated = { ...updated, imageurl: new_post_image_url }
    }

    if (req.file) {
        db.query(SqlOldFile, postId, async (err, result) => {
            if (err) {
                throw (err)

            }
            if (result[0].imageurl) {
                const oldFileName = result[0].imageurl.split("/images/")[1];
                if (oldFileName) {
                    console.log("delete file result", oldFileName)
                    fs.unlink(`images/${oldFileName}`, () => {
                        if (err) console.log("err delete image ", err);
                        else {
                            console.log("Ancienne image de post supprimée");
                        }
                    })
                }
            }

        })
        const sql = `UPDATE post SET ? WHERE ID=?`
        db.query(sql, [updated, req.params.id], async (err, result) => {
            if (err)
                throw err
            else
                res.status(200).json(result)
        })

    }
    else {
        const sql = `UPDATE post SET ? WHERE ID=?`
        db.query(sql, [updated, req.params.id], async (err, result) => {

            if (err)
                throw err
            else
                res.status(200).json(result)
        })
    }




}

/* const sql = `UPDATE post SET ? WHERE ID=?`
   db.query(sql, [updated, req.params.id], async (err, result) => {
       if (err)
           throw err
       else
           res.status(200).json(result)
   })*/