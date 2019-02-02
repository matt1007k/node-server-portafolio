module.exports = {
    dbmongo: 'mongodb://matt1007:sa1234@ds129454.mlab.com:29454/portafolio-db',
    port: process.env.PORT || 3000,
    secret: 'app-web-portfolio',
    expiredToken: 60 * 60 * 24 * 30
}