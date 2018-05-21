var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const SERVER_PORT = (process.env.PORT || '8080');

mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var postModel = require('./models/postModel');
let Post = postModel.PostModel;
let Comment = postModel.CommentModel;


var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// You will need to create 5 server routes
// These will define your API:


//--------------------------------------------------------------------------------------
// 1) to handle getting all posts and their comments
app.get('/posts', function (request, response) {
  console.error(request);
  Post.find().exec(function (err, posts) {
    if (err) {
      console.error(err);
    }
    else {
      console.log(posts);
    }
    response.send(posts)
  })
});

// 2) to handle adding a post
app.post('/posts', function (request, response) {
  var newPost = new Post(request.body)
  newPost.save(function (err, result) {
    if (err) return console.log(err);
    response.send(newPost);
  })
});
// 3) to handle deleting a post

app.delete('/delete/posts/:id', function (req, res) {
  let id = req.params.id;

  Post.remove({ _id: id }, function (err, response) {
    if (err) {
      res.send("failed")
    } else {
      console.log("post(id:" + id + ") was removed")
      res.send("Deleted")
    }
  })
})




// 4) to handle adding a comment to a post

app.post('/posts/:id/comments', function (request, response) {

  let id = request.params.id //post id
  var newComment = new Comment(request.body); //create new comment with comment schema and comment data

  //find post by id and return the post
  let thisPost;
  Post.findById(id, function (err, post) {
    if (err) {
      return console.log(err)
    } else {
      console.log("post:" + post)
      thisPost = post;
      return post;
    }
  }).then(() => {
    thisPost.comments.push(newComment); //push subdoc into comments array
    thisPost.save(function (err, data) {  //save the post, if success return the comment
      if (err) {
        console.error(err);
      } else {
        console.error(data);
        response.send(newComment)
      }
    })
  })
})

// 5) to handle deleting a comment from a post
app.delete('/delete/posts/:postId/comments/:commentId', function (req, res) {
  let postId = req.params.postId;
  let commentId = req.params.commentId;
  //find the post by id
  let thisPost;
  Post.findById(postId, function (err, post) {
    if (err) {
      return console.log(err)
    } else {
      // console.log("post:" + post)
      thisPost = post;
      return post;
    }
  }).then(() => {
    console.log(thisPost)
    console.log(thisPost.comments)
    console.log("test====================================================" + thisPost.comments.id(commentId))
    thisPost.comments.id(commentId).remove()
    thisPost.save(function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.error(data);
        res.send("comment removed successfuly")
      }
    })
  })
  //find the comment by id
  //remove comment



})



app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
