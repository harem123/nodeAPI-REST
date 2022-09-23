// required to upload images
const uploadFile = require("../services/uploadService.js");
const fs = require("fs");
const url = require('url');
// attention here is the url where get images
const baseUrl = "http://localhost:3000/images/";
// model import
const v1ServiceMovie = require('../services/movieServices.js')
const db = require("../../models/index.js");
const genreAssociateModel = db.genre_movie;

// ****** script init ***
const searchBy= async (req,res) => {
  try{
    let allData= null
    let firstKey=Object.keys(req.query)[0];
    switch (firstKey) {
      case 'name':
        const byName = {
          name: req.query.name
        }
        allData = await v1ServiceCharacter.getByFilter(byName)
        break
      case 'age':
        const byAge = {
          age: req.query.age
        }
        allData = await v1ServiceCharacter.getByFilter(byAge)
        break
      case 'movieId':
        
        break
      default: 
      allData = await v1ServiceCharacter.getAll()
    }
    //TODO review if it is better send raw data 
    res.status(200).send({data:allData});
  }
  catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
    
}



const createMovie = async (req, res) => {
  try {
  await uploadFile(req,res)
  const link = baseUrl  + req.file.originalname
  // TODO change movie ARR to genre arr
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
    
    createMovie,
    
   
  }
