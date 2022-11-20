const { Router } = require("express");

module.exports = (app) => {
    const userController = require("../controllers/user.controller");

    const router = require("express").Router();

    //SignUp route a new user 

    router.post('/auth/signup', userController.signUp);

    router.post('/auth/login', userController.login);


    app.use("/api", router);

}