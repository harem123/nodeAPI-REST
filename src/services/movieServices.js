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
const getById = async (id,model=movieModel) => {
    
  const byIdInfo = await model.findOne({ where: { id: id} });
    if (byIdInfo === null) {
      console.log('Not found!');
    } else {
      
      console.log(byIdInfo); // 'My Title'
    }
    return byIdInfo
}
const getByName = async (id,model=movieModel) => {
    
  const nameInfo = await model.findOne({ where: { title: id} });
    if (nameInfo === null) {
      console.log('Not found!');
    } else {
      
      //console.log(nameInfo); // 'My Title'
    }
    return nameInfo
}



// create users try catch doesnt work propertly
const  postMovie = async (userBody,model=movieModel) => {
  try{
    const createResult = await model.create(userBody)
  
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
    getById,
    postMovie,
    getByName,
    
  }