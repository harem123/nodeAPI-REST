//TODO implement search by title filtering by gender to get ASC or DESC order movies 
const db = require("../../models/index.js");
const characterModel = db.character;
const associatedMovie= db.character_movie
const movieModel = db.movie

// show all data 
const getAll= async() => {
  try{
    const data = await  characterModel.findAll({attributes:['name','img_link']})   
      return data
  }
  catch(err){
    console.log(err)
  }  
}

const getByFilter= async(filter,model=characterModel) => {
  try{
  
    const data = await  model.findAll({
      attributes:['name','img_link'],
      where: filter
    });
      return data
  }
  catch(err){
    console.log(err)
  }  
}
const getByMovieId= async(filter) => {
  try{
    //TODO pass complete query from controller 
    
    const data = await  movieModel.findAll({
      where: filter,
      attributes:['title','img_link'],
      include:[{
        model: characterModel,
        attributes:['name','img_link']
      }]
    })   
    console.log(data)
    return data
  }
  catch(err){
    console.log(err)
  }  
}

// get details
const  getDetails = async (filter,model=characterModel) => {
  try{
    const result = await  model.findAll({
      where:filter,
      include:[{
        model: movieModel,
        attributes:['title','img_link']
      }]
    })
      return result
  }
  catch(error){
    console.log(error)
  }
}

//TODO create users try catch doesnt work propertly
const  postCharacter = async (userBody) => {
  try{
    const createResult = await characterModel.create(userBody)
  
    console.log(createResult.id)
    return (createResult.id)
  }
  catch(error){
    console.log(error)
  }
  
}

/////// exports
  module.exports = {
    postCharacter,
    getAll ,
    getByFilter,
    getByMovieId,
    getDetails
  }
