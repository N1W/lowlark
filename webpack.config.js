const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: {
        ll: "./js/main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/script.js",
        publicPath: "/"
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 8000,
        watchContentBase: true
    },
    module: {
        rules: [
            {
                // test: /\.jsx?$/,
                // include: path.resolve(__dirname, "src"),
                // use: [
                //     {
                //         loader: "babel-loader",
                //         options: {
                //             presets: [["env", "stage-0", {modules: false}]]
                //         }
                //     }
                // ]
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                use: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: "file-loader?name=[path][name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "css/style.css",
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            inject: true
        })
    ]
};

