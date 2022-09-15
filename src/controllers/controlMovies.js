// requerido para subir las fotos 
const uploadFile = require("../services/uploadService.js");
const fs = require("fs");
// aqui ojo esta la direccion donde apunto el descargar la imagen 
const baseUrl = "http://localhost:3000/images/";
// importo el modelo
const v1ServiceMovie = require('../services/movieServices.js')
const db = require("../../models/index.js");
const genreAssociateModel = db.genre_movie;

const getMovies= (req,res) => {
    // servicios previos a la respuesta
    const allData = v1ServiceMovie.getAllMovies()
    console.log("data " + allData)
    // envio la respuesta
    res.send({status:"OK", data:allData});
}

const getInfoByMovie = (req,res) => {
    const infoByMovie = v1Service.getOneMovie();
    res.send(infoByMovie);
}

const createMovie = async (req, res) => {
  await uploadFile(req,res)
  const link = baseUrl + req.file.originalname
  const arras = req.body.movieArr
    const dataj = JSON.parse(arras); 

  const {body} = req
  if ( 
    !body.title 
  ){
    return
  }
 // inicializo la info
 const newMovie= {
  title: body.title,
  img_link: link,
    created_date: body.created_date,// yyyy-mm-dd
  score: body.score
 }  
  try {
    createdMovie= await v1ServiceMovie.postMovie(newMovie)
    res.status(201).send({status:"OK", movieCreatedId: createdMovie} );
    // inserto con el id en la tabla movie-genre 
    // TODO agregar un propio try catch para genre movie insertion  
    for (i = 0; i < dataj.length; i++) {
      const arras= {
          movieId: createdMovie,
          genreId: dataj[i]
         }
  
         genreAssociateModel.create(arras);
    } 
  } catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
};

  module.exports = {
    getMovies,
    getInfoByMovie,
    createMovie
  }
