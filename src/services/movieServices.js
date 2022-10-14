//TODO implement search by title filtering by gender to get ASC or DESC order movies 
const db = require("../../models/index.js");
const movieModel = db.movie;
const characterModel = db.character
const genreModel = db.genre
const associatedChar = db.character_movie


//const genreModel = db.genre;
// show all data 

const getByFilter= async(filter,model= movieModel) => {
  try{
    const data = await  model.findAll({
      attributes:['title','img_link','created_date'],
      where: filter
    });
      return data
  }
  catch(err){
    console.log(err)
  }  
}

const getAll= async(order) => {
  // TODO return genre and associated characters
    try{
      const data = await  movieModel.findAll({
        order: [
          ['id', order] 
      ],
      attributes:['title','img_link','created_date']})
        return data
    }
    catch(err){
      console.log(err)
    }  
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

const  details = async (filter,model=movieModel) => {
  try{
    //console.log(filter)
    const result = await  movieModel.findAll({
      where:filter,// [{title: 'hellboy'}],
      include:[{
        model: characterModel,
        attributes:['name','img_link']
      }]
    })
 
      return result
      } catch(error){
    console.log(error)
    
  }
}

const  simpleGenre = async (filter,model=movieModel) => {
  try{
    const result = await  model.findAll({
      where: filter,
      attributes:['title','img_link','created_date'],
      include:[{
        model: genreModel,
        attributes:['name']
      }]
      })
      return result
  } catch(error){
    console.log(error)
  }}

/////// exports
  module.exports = {
    getAll,
    postMovie,
    getByFilter,
    details,
    simpleGenre
  }
