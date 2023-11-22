const Course = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    storedCourses(req, res, next){
        let courseQuery=Course.find({})
        if(req.query.hasOwnProperty('_sort')){
           courseQuery=courseQuery.sort({
                [req.query.column]: req.query.type
           })
        }
        Promise.all([courseQuery, Course.countDocumentsWithDeleted({deleted: true})])
            .then(([courses,countCourses])=>{
                res.render('me/stored-courses',
                {courses: mutipleMongooseToObject(courses),countCourses})
            })
           }
    trashCourses(req, res, next){
        Course.findWithDeleted({deleted: true})
            .then(courses=> res.render('me/trash-courses',
                {courses: mutipleMongooseToObject(courses)}))
            .catch(next)
       
    }
    myNews(req, res, next){
        res.json({msg: "my news"})
    }
}
module.exports= new MeController

