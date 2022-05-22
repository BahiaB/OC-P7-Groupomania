
//const fs = require("fs");
const jwt = require("jsonwebtoken");
const dbc = require("../db");

const db = dbc.getDB();

exports.createPost = (req, res, next) =>{
    
    console.log(req.body);
    console.log(req.auth.userId);
    const newPost = {
        user_id: `${req.auth.userId}`,
        message: req.body.message,
        imageurl: null,
      };
      const sql = "INSERT INTO post SET ?";
      db.query(sql, newPost,(err, result) =>{
          if (err){
              //console.log(err);
              throw(err);
          }
         
          res.status(200).json({message: "Le post a été crée"})
      });
};

exports.getAllPosts = (req, res, next) =>{
     const sql =
    "SELECT ";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.updatePost = (req, res, next) =>{
    const postId = req.params.id;
    const userId = req.auth.userId; // ID du token
    const sql = `UPDATE post SET ? WHERE id= '${postId}'`;
    //const user_id = req.params.user_id;
    const user_post_id = "SELECT * FROM user WHERE UID= ?;";
    console.log("userid:", userId)
    db.query(user_post_id,  userId, (err,result) =>{
        if (err) {
            console.log(err)
            throw err;
        }
        console.log(result[0]);
        if(userId === `${result[0].UID}`){
            const postUpdated ={
                user_id: `${req.auth.userId}`,
                message: req.body.message,
            }
            db.query(sql, postUpdated, (err, result) =>{
                if (err){
                    console.log(err);
                    throw(err);
                }
                res.status(200).json({ message: "post modifié!" });
               
            })

        }
    })
    
};

exports.deletePost = (req, res, next) =>{

}