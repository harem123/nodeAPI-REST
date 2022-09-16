//TODO implement search by title filtering by gender to get ASC or DESC order movies 
const db = require("../../models/index.js");
const movieModel = db.movie;
//const genreModel = db.genre;
// show all data 
const getAllMovies= async() => {
  try{
    const data = await  movieModel.findAll({attributes:['title','score','img_link']})
      //console.log(movies)
      //const result = JSON.stringify(data)
      //console.log(result)
      return data
  }
  catch(err){
    console.log(err)
  }  
}

// TODO show one user by id but really
const getOneMovie = async (id) => {
    
  const movieInfo = await movieModel.findOne({ where: { id: id} });
    if (movieInfo === null) {
      console.log('Not found!');
    } else {
      
      console.log(movieInfo); // 'My Title'
    }
    return movieInfo
}
const getMovieByName = async (id) => {
    
  const movieInfo = await movieModel.findOne({ where: { title: id} });
    if (movieInfo === null) {
      console.log('Not found!');
    } else {
      
      console.log(movieInfo); // 'My Title'
    }
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
    getMovieByName
    ///// genre services exportations
   
  
  }