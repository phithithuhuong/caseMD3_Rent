const fs= require('fs')
class HomeController {
   static view(req,res){
       fs.readFile('./view/home.html', 'utf8',(err, homeHtml)=>{
           if (err){
               console.log(err)
           }else {
               res.writeHead(200, 'Content-Type', 'text/html');
               res.write(homeHtml);
               res.end();
           }
       })
   }


}

module.exports= HomeController