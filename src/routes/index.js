const newRoute=require('./news')
const siteRoute=require('./site')
const courseRoute=require('./courses')
const meRoute=require('./me')

function route(app){
    app.use('/news',newRoute)
    app.use('/courses',courseRoute)
    app.use('/me',meRoute)
    app.use('/',siteRoute)
}
module.exports=route