const v1ServiceGenre = require('../services/genresServices.js')

const getGenres= (req,res) => {
    // servicios previos a la respuesta
    const allData = v1ServiceGenedr.getAllGenres()
    // envio la respuesta
    res.send({status:"OK", data:allData});
}

const getInfoByGenre = (req,res) => {
    const infoByMovie = v1ServiceGender.getOneGenre();
    res.send(infoByMovie);
}


const createGenre = async (req, res) => {
  const {body} = req
  if ( 
    !body.name 
    
  ){
    return
  }
 // inicializo la info
 const newGenre= {
  name: body.name,
  img_link: body.img_link
  
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
    getGenres,
    getInfoByGenre,
    createGenre
  }
