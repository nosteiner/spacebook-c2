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



