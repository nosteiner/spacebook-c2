import PostsRepository from './posts-repository.js';
import PostsRenderer from './posts-renderer.js';
import EventsHandler from './events-handler.js';
import Api from './Api.js'

let api = new Api();


let postsRepository = new PostsRepository(api);
let postsRenderer = new PostsRenderer();
let eventsHandler = new EventsHandler(postsRepository, postsRenderer);


postsRepository.initData().then(function () {
    postsRenderer.renderPosts(postsRepository.posts)

})
eventsHandler.registerAddPost();
eventsHandler.registerRemovePost();
eventsHandler.registerToggleComments();
eventsHandler.registerAddComment();
eventsHandler.registerRemoveComment();





