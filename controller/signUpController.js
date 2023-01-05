
const fs= require('fs')
const userModel= require('../model/userModel');
const baseController = require('./baseController.js');
const qs =require('qs')
class SignUpController extends baseController{
    static view = async (req, res) => {
        if (req.method === "GET") {
           await fs.readFile('./view/login/signUp.html', 'utf8',(err, dataHTML) =>  {
                res.writeHead(200, 'Content-Type', 'text/html');
                res.write(dataHTML);
                res.end();
            })

        } else {
            let data= '';
            req.on('data',chunk=>{
                data+=chunk;

            })
            req.on('end',async (err)=>{
                if (err){
                    console.log(err.message)
                } else {
                    let user= qs.parse(data);
                  await userModel.signUp(user)
                    res.writeHead(301, {'location':'/home'});
                  res.end()
                }
            })
        }

    }
}
module.exports= SignUpController;