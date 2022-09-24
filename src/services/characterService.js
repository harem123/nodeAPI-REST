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
    
    const data = await  associatedMovie.findAll({
      where: filter,
      attributes: ['characterId'],
      raw: true,
      nest: true
    });
    
    //const datajson = JSON.parse(data); 
    let bulkId = []
    for (i=0; i < data.length; i++){
      
      bulkId.push(data[i].characterId)
    }
    console.log(bulkId)
    // TODO not use db from controller
    const characterData = await characterModel.findAll({
      attributes:['name','img_link'],
      where: {
        id: bulkId// Same as using `id: { [Op.in]: [1,2,3] }`
      }
    });
    
    return characterData
  }
  catch(err){
    console.log(err)
  }  
}

// get details
const getDetails= async(filter,model=characterModel) => {
  try{
    const data = await  model.findAll({
      where: filter    
    })
    console.log(data)

   const charId= data[0].id

   const idMovies = await  associatedMovie.findAll({
    //TODO get only id 
        where:  {
      characterId: charId
    }   
  })

  let bulkId = []
    for (i=0; i < idMovies.length; i++){
      
      bulkId.push(idMovies[i].movieId)
    }
    console.log(bulkId)
  
    const movieData = await movieModel.findAll({
      attributes:['title','img_link'],
      where: {
        id: bulkId// Same as using `id: { [Op.in]: [1,2,3] }`
      }
    })
    console.log(movieData)
    const detailData = {data,movieData}
      return detailData
  }
  catch(err){
    console.log(err)
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