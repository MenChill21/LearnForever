const Course = require('../models/Course')
const {mongooseToObject} = require('../../util/mongoose')

class CourseController {
    show(req, res, next){
        Course.findOne({slug : req.params.slug})
            .then(course =>  {
                res.render('course/show.hbs',{course: mongooseToObject(course)} )
            })
            .catch(next)
    }
    
    create(req, res, next){
        res.render('course/create')
    }

    store(req, res, next){
        const formData=req.body
        const course=new Course(formData)
        course.save()
                .then(()=> res.redirect('/me/stored/courses'))
                .catch(err=> {})
    }

    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course=> res.render('course/edit',{course : mongooseToObject(course)} ))
            .catch(next)
    }

    update(req, res, next){
        const formData=req.body
        Course.updateOne({_id: req.params.id},formData)
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(err=> {})
    }

    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }
    //[PATCH] 
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }

    forceDelete(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next)
    }

    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: {$in: req.body.coursesIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                    Course.restore({_id: {$in: req.body.coursesIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({error: 'Action is invalid'})
        }
    }

}
module.exports= new CourseController