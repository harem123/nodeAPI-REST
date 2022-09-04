const express = require("express")
const router =  express.Router()
const v1Controller = require('../controllers/controllers.js')
const v1ControlMovies = require('../controllers/controlMovies.js')
const v1ControlGenre = require('../controllers/controlGenres.js')
const v1ControlImages = require('../controllers/controlImages')
const v1genreCreator = require('../controllers/genreCreator')

router.get("/", v1Controller.getAllinfo)

//router.get("/:getId",v1Controller.getInfoByUser);

 //router.get("/files:name",v1ControlImages.download);
 router.get("/files/:name", v1ControlImages.download);

router.post("/createUser", v1Controller.createUser);

router.post("/createMovie", v1ControlMovies.createMovie);

//router.post("/Genre", v1ControlGenre.createGenre);

router.post("/upload", v1ControlImages.upload);

router.post("/createGenre", v1genreCreator.createGenre);

//router.patch("/:patchId", v1Controller.updateOneWorkout);

//router.delete("/:deleteById", v1Controller.deleteOneWorkout);  

// exporting modules
module.exports = router
