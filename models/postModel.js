var mongoose = require('mongoose');

//design the two schema below and use sub docs 
//to define the relationship between posts and comments


let commentSchema = new mongoose.Schema({
    
        text: String,
        user: String
    
},{ usePushEach: true });


let postSchema = new mongoose.Schema({

        text: String,
        comments: [commentSchema]
     
},{ usePushEach: true });

let PostModel = mongoose.model('post', postSchema)
let CommentModel = mongoose.model('comment', commentSchema)

module.exports.PostModel = PostModel
module.exports.CommentModel = CommentModel

