
const fs = require('fs')

class NotFound{
    static view(req,res){
        fs.readFile('./view/err/notFound.html','utf8',(err, notFoundHtml)=>{
            if (err){
                console.log(err.message)
            } else {
                res.write(notFoundHtml);
                res.end();
            }
        })
    }
}
module.exports= NotFound