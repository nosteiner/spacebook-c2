<<<<<<< HEAD
var postArr = [];
var id = 0;

function addPost(text, id) {
    var post = {
        postText: text,
        postId: id
    };
    postArr.push(post);
}

function renderPosts() {
    $(".posts").empty();

    for (i = 0; i < postArr.length; i++) {
        var $newPostText = postArr[i];
        var $newPostId = postArr[i];
        $('.posts').append($('<p>' + $newPostText["postText"] + " " + '</p>').attr('class', "post").attr('data-id', $newPostId["postId"])
            .append($('<button>' + "REMOVE" + '</button>').attr('class', "remove").attr('type', "button")
            ));
    }
}

var deletPost = function (delById) {
    for (var i = 0; i < postArr.length; i++) {
        if (postArr[i].postId === delById) {
            postArr.splice(i, 1);
            renderPosts();
            return
        }
    }
}
$('.posts').on('click', '.remove', function () {
    var delById = $(this).closest('p').data().id;
    deletPost(delById);
})

var clicked = function () {
    var text = $(this).closest("div").find("input").val();
    id++;
    addPost(text, id);
    renderPosts(); 
    
};



$('button').click(clicked);
$('.remove').click(deletPost);

=======
var SpacebookApp = function () {
  var posts = [
     {text: "Hello world", id: 0, comments:[
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"}
      ]},
      {text: "Hello world", id: 0, comments:[
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"}
      ]},
      {text: "Hello world", id: 0, comments:[
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"},
        { text: "Man, this is a comment!"}
      ]}  
  ];

  // the current id to assign to a post
  var currentId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }


  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments: []
    }

    currentId += 1;

    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' +
        '<input type="text" class="comment-name">' +
        '<button class="btn btn-primary add-comment">Post Comment</button>' +
        '<ul class="comment-list"></ul> </div>';

      $posts.append('<div class="post" data-id=' + i + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
        renderComments(i)//Here lets call render commnet function and we will pass i as the post id so we know what to render
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (currentPost) {
    var $clickedPostComment = $(currentPost).closest('.post');
    var id = $clickedPostComment.data().id;
    //var post = _findPostById(id);

    var commenttext = $clickedPostComment.children('.comments-container').children('.comment-name').val()

    var comment = {
      text: commenttext
    }

    posts[id].comments.push(comment);
    
    renderComments(id)
    
  }

  var renderComments = function (id) {
    var post=$(".post[data-id=" + id + "]")
    var commentList = post.find('.comment-list')
    var commentsArr = posts[id].comments
    
    commentList.empty();

    for (i = 0; i < commentsArr.length; i++) {
      var comment = commentsArr[i].text
      var li = '<li class="comment" data-id=' + i + '>' + comment + '<a href="#" class="remove-comment" data-id="1">remove</a></li>';
      commentList.append(li);
      
    }
/////
  }

  var removeComment = function (currentComment) {
    var $clickedComment = $(currentComment).closest('.comment');
    var $idComment = $clickedComment.data().id;
    var $idPost = $clickedComment.closest('.post').data().id
    var commentsArr = posts[$idPost].comments
    //var comment = commentsArr[$idComment]
    commentsArr.splice($idComment, 1);
    $clickedComment.remove();
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,
    createComment: createComment,
    renderComments: renderComments,
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  app.createComment(this);
  
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);


});
>>>>>>> newbranch


