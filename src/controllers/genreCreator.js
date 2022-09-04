const v1ServiceGenre = require('../services/genresServices.js')

const uploadFile = require("../services/uploadService.js");
const fs = require("fs");
// aqui ojo esta la direccion donde apunto el descargar la imagen 
const baseUrl = "http://localhost:3000/images/";

const createGenre = async (req, res) => {

   await uploadFile(req,res)
const link = baseUrl + req.file.originalname
  const {body} = req
  if ( 
    !body.name 
    
  ){
    return
  }
 // inicializo la info
 const newGenre= {
  name: body.name,
  img_link: link
  
 }
  //TODO buscar como funciona un post service sequelize
  //onst createdUser = usersModel.create(newUser);
  try {
    createdGenre= await v1ServiceGenre.postGenre(newGenre)
    res.status(201).send({status:"OK", userId: createdGenre} );
  } catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
};

  module.exports = {
    
    createGenre
  }
