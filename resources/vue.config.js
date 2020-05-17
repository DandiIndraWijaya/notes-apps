module.exports = {
    outputDir: '../dist',
    indexPath: '../index.html',
    publicPath: process.env.NODE_ENV == 'production' ? 'dist/' : './',
    devServer: {
        public: 'localhost:8080',
        host: 'localhost',
        port: '8080'
    }
}