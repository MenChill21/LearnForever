
class NewController {

    input(req,res){
        res.render('news')
    }
    show(req,res){
        res.send('Detail news')
    }

}
module.exports= new NewController