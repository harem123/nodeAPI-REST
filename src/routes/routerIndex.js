const express = require("express")
const router =  express.Router()

const v1ControlMovies = require('../controllers/controlMovies.js')
const v1ControlCharacters = require('../controllers/controlCharacters.js')

const v1ControlImages = require('../controllers/controlImages')
const v1genreCreator = require('../controllers/genreCreator')
const v1RegistControl = require('../controllers/userControl')
const v1ControlEmail = require('../controllers/nodemailer.js')

// movie endpoints

router.delete("/movie/deleteByTitle", v1ControlMovies.deleteByTitle);

router.get("/movie/detail", v1ControlMovies.simpleDetails);
 
router.get("/movies", v1ControlMovies.searchBy);

router.patch("/updateMovie", v1ControlMovies.updateMovie);

router.post("/createMovie", v1ControlMovies.createMovie);

// characters endpoints

router.post("/createCharacter", v1ControlCharacters.createCharacter);

router.patch("/updateCharacter", v1ControlCharacters.updateCharacter);

router.get("/character", v1ControlCharacters.searchBy);

router.delete("/character/deleteByname", v1ControlCharacters.deleteByName);

router.get("/character/detail", v1ControlCharacters.charDetails);

// register and login endpoints

router.post("/auth/register", v1RegistControl.registerUser);

router.post("/auth/login", v1RegistControl.login);

// genre creation endpoint 

router.post("/createGenre", v1genreCreator.createGenre);

// other endpoints

router.post("/upload", v1ControlImages.upload);

router.get("/files/:name", v1ControlImages.download);

router.get("/email" , v1ControlEmail.sendEmail);

router.post("/protected", v1RegistControl.ensureToken,v1RegistControl.protectedSection);


// exporting modules
module.exports = router
