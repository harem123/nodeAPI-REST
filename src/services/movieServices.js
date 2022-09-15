//TODO implement search by title filtering by gender to get ASC or DESC order movies 
const db = require("../../models/index.js");
const movieModel = db.movie;
//const genreModel = db.genre;
// show all data 
const getAllMovies= async () => {
  const data = await movieModel.findAll({attributes:['title','score','img_link']})
  .then(movies => {
      //console.log(movies)
      const result = JSON.stringify(movies)
      console.log(result)
      return result
  })
  .catch(error => {
      console.log(error)
  })
 
}
// TODO show one user by id but really
const getOneMovie = () => {
    const movieInfo = "movie info by id"
  
    return movieInfo
}
// create users try catch doesnt work propertly
const  postMovie = async (userBody) => {
  try{
    const createResult = await movieModel.create(userBody)
  
    console.log(createResult.id)
    return (createResult.id)
  }
  catch(error){
    console.log(error)
  }
  
}

/////// exports
  module.exports = {
    getAllMovies,
    getOneMovie,
    postMovie,
    ///// genre services exportations
   
  
  }