
const Courses = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class SiteController {

    input(req,res,next){
        Courses.find({})
            .then(courses=> {
                res.render('home', {courses: mutipleMongooseToObject(courses)} )
            })
            .catch(next)
    }
    show(req,res){
        res.render('search')
    }
}
module.exports= new SiteController