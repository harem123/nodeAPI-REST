// required to upload images
const uploadFile = require("../services/uploadService.js");
const fs = require("fs");
const url = require('url');
// attention here is the url where get images
const baseUrl = "http://localhost:3000/images/";
// model import
const v1ServiceMovie = require('../services/movieServices.js')
const v1Services = require('../services/services.js')
const db = require("../../models/index.js");
const genreAssociateModel = db.genre_movie;
const movieModel = db.movie

// ****** script init ***
const updateMovie = async (req,res) =>{
   // TODO use success sequelize
  try{
    const valueBody = req.body.value
    //console.log(valueBody)
    const filterBody = req.body.filter
    console.log(filterBody)
       const filter =
      {
        where: filterBody
      }
         await v1Services.updater(valueBody,filter,model=movieModel)
         res.status(201).send({status:"OK"} );
  }
  catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
}

const deleteByTitle = async (req,res) => {
  try {
   const byTitle = {
     title: req.query.title
   }
 
   const deleteResult = v1Services.destroyer(filter= byTitle,model=movieModel)
   res.status(200).send({deleteResult});
  } 
  catch (error) {
   console.log(error)
   res.status(500).send({status:"FAILED"});
 } 
 }

const searchBy= async (req,res) => {
  try{
    let allData= null
    let firstKey=Object.keys(req.query)[0];
    switch (firstKey) {
      case 'title':
        const byTitle = {
          title: req.query.title
        }
        allData = await v1ServiceMovie.getByFilter(byTitle)
        break
      case 'genreId':
        const byGenre = {
          id: req.query.genreId
        }
        allData = await v1ServiceMovie.simpleGenre(byGenre)
        break
      case 'order':
         const  order= req.query.order
           allData = await v1ServiceMovie.getAll(order)
        break
        default: 
      allData = await v1ServiceMovie.getAll('ASC')
    }
    //TODO review if it is better send raw data 
    res.status(200).send(allData);
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
  
  const {body} = req
  if (!body.title ){
    return
  }
 // inicializo la info
 const newMovie= {
  title: body.title,
  img_link: link,
  created_date: body.created_date,// yyyy-mm-dd
  score: body.score,
  genreId:body.genreId
 }  
 
    createdMovie= await v1ServiceMovie.postMovie(newMovie)
    res.status(201).send({status:"OK", movieCreatedId: createdMovie} );
     
    } catch (error) {
    console.log(error)
    res.status(500).send({status:"FAILED"});
  } 
};

const simpleDetails = async (req,res) => {
  try {
    const byTitle = {
      title: req.query.title
    }
   const data=  await v1ServiceMovie.details(byTitle)

   res.status(200).send(data[0]);
  } 
  catch (error) {
   console.log(error)
   res.status(500).send({status:"FAILED"});
 } }

  module.exports = {
    createMovie,
    searchBy,
    deleteByTitle,
    updateMovie,
    simpleDetails
  }
