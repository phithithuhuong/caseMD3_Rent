const BaseController = require('./baseController.js');
const LoginController = require('./loginController.js');
const RoomController = require('./roomController.js');
const UserController = require('./userController.js');
const NotFound = require('./notFound.js');
const HomeController = require('./homeController.js')
const signupController = require('./signUpController.js')
const rentController= require('./rentController.js')
class Router extends BaseController {
    static login = LoginController;
    static room = RoomController;
    static user = UserController;
    static notFound = NotFound;
    static home = HomeController;
    static signup= signupController;
    static rent= rentController;

}

module.exports = Router;