const express = require('express');
const Project = require('../models/project');
const mongoose = require('mongoose');
const routes = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file , cb) {
        cb(null , './uploads');
    },
    filename : function(req, file , cb) {
        cb(null, Date.now() + "-" + file.fieldname + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == "image/jpg" ||
       file.mimetype === "image/jpeg" ||
       file.mimetype === "image/png") {
        cb(null, true);
    }
    cb(null, false);
    
}

const upload = multer({
    storage : storage,
    fileFilter : fileFilter,
    limits : {fileSize : 1024 * 1024 * 2}
})


//get route for project

routes.get('/', (req,res) => {
    res.render('projectform')
})

//post route for project
routes.post('/' , upload.single('image') , (req, res) => {
    const project = new Project({
        title: req.body.title,
        info : req.body.info,
        image : req.file.filename
    })

    project.save().then((data) => res.json(data))
    .catch(e => console.log(e))
})

routes.get('/' , (req, res) => {
    res.send('in Project route')
})


//show all files
routes.get('/show' , (req, res) => {
    Project.find({})
    .exec()
    .then((data) => res.json(data))
    .catch(e => console.log(e))
})

module.exports = routes