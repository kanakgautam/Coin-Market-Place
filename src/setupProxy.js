const proxy = require("http-proxy-middleware");

module.exports = function(app){
    app.use(
        proxy("/api/v1/posts/?auth_token=e11878d3098425272a28c4d3d92989f843dedbd2&kind=news", {
            target: "https://cryptopanic.com",
            changeOrigin:true
        })
    )
}