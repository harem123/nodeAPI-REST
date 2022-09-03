const v1ServiceMovie = require('../services/movieServices.js')

const getMovies= (req,res) => {
    // servicios previos a la respuesta
    const allData = v1ServiceMovie.getAllMovies()
    // envio la respuesta
    res.send({status:"OK", data:allData});
}

const getInfoByMovie = (req,res) => {
    const infoByMovie = v1Service.getOneMovie();
    res.send(infoByMovie);
}


const createMovie = async (req, res) => {
  const {body} = req
  if ( 
    !body.title 
    
  ){
    return
  }
 // inicializo la info
 const newMovie= {
  title: body.title,
  img_link: body.img_link,
  created_date: body.created_date,
  score: body.score
 }
  //TODO buscar como funciona un post service sequelize
  //onst createdUser = usersModel.create(newUser);
  try {
    createdMovie= await v1ServiceMovie.postMovie(newMovie)
    res.status(201).send({status:"OK", userId: createdMovie} );
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
