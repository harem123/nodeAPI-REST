const db = require("../../models/index.js");
//const movieModel = db.movie;
const genreModel = db.genre;
// show all data 
const getAllGenres= () => {
  const data = genreModel.findAll({attributes:['title','score']})
  .then(genres => {
      const resultados = JSON.stringify(genres)
      console.log(resultados)
  })
  .catch(error => {
      console.log(error)
  })
  return data
}
// TODO show one user by id but really
const getOneGenre = () => {
    const genreInfo = "genre info by id"
  
    return genreInfo
}
// create users try catch doesnt work propertly
const  postGenre = async (userBody) => {
  try{
    const createResult = await genreModel.create(userBody)
  
    console.log(createResult.id)
    return (createResult.img_link)
  }
  catch(error){
    console.log(error)
  }
  
}

/////// exports
  module.exports = {
    getAllGenres,
    getOneGenre,
    postGenre,
    ///// genre services exportations
   
  
  }