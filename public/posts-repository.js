import Api from './Api.js';

/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */


class PostsRepository {
    constructor() {
        this.posts = [];
        this.api = new Api()

    }

    async initData() {
        this.posts = await this.api.fetch()
    }

    async addPost(postText) {
        var postData = { text: postText }

        let post = await $.ajax({
            type: "POST",
            url: '/posts',
            data: postData,
        })

        this.posts.push(post);


    }
    async removePost(index) {
        let id = this.posts[index]._id

        return $.ajax({
            type: 'Delete',
            url: '/delete/posts/' + id
        }).then((data) => {
            if (data == "Deleted")
                this.posts.splice(index, 1);
        })
    }


    async addComment(newComment, postIndex) {
        let id = this.posts[postIndex]._id

        let comment = await $.ajax({
            type: "POST",
            url: '/posts/' + id + '/comments',
            data: newComment,
        })
        this.posts[postIndex].comments.push(comment);
        console.log(this.posts[postIndex])
    };

    deleteComment(postIndex, commentIndex) {
        let postId = this.posts[postIndex]._id;
        let commentId = this.posts[postIndex].comments[commentIndex]._id;
        console.log(commentId + "commentId")

        return $.ajax({
            type: 'Delete',
            url: '/delete/posts/' + postId + '/comments/' + commentId
        }).then((data) => {
            console.log(data)
            if (data == "comment removed successfuly")
                console.log("working")
            this.posts[postIndex].comments.splice(commentIndex, 1);
        })
    };
}

export default PostsRepository