class Api {
    constructor() {
    }


    fetch() {
        return $.ajax({
            url: "/posts"
        });

    }
}
export default Api;