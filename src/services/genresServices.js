const db = require("../../models/index.js");

const genreModel = db.genre;

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

const  postGenre = async (userBody) => {
  try{
    const createResult = await genreModel.create(userBody)
  
    return (createResult.img_link)
  }
  catch(error){
    console.log(error)
  }
  
}

/////// exports
  module.exports = {
    getAllGenres,
    postGenre,
    ///// genre services exportations
 }