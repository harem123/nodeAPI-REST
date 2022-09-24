//TODO implement search by title filtering by gender to get ASC or DESC order movies 
const db = require("../../models/index.js");
const movieModel = db.movie;
const characterModel = db.character
const associatedGenre = db.genre_movie
const associatedChar = db.character_movie

//const genreModel = db.genre;
// show all data 

const getDetails= async(filter,model=movieModel) => {
  try{
    const data = await  model.findAll({
      where: filter    
    })
    console.log(data)
//TODO change var names
   const movieId= data[0].id

   const characterList = await  associatedChar.findAll({
    attributes:['characterId'],
        where:  {
      movieId: movieId
    }   
  })

  let bulkId = []
    for (i=0; i < characterList.length; i++){
      
      bulkId.push(characterList[i].characterId)
    }
    console.log(bulkId)
  
    const charData = await characterModel.findAll({
      attributes:['name','img_link'],
      where: {
        id: bulkId// Same as using `id: { [Op.in]: [1,2,3] }`
      }
    })
    //console.log(movieData)
    const detailData = {data,charData}
      return detailData
  }
  catch(err){
    console.log(err)
  }  
}


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

const getByGenreId= async(filter) => {
  try{
    //TODO pass complete query from controller 
    
    const data = await  associatedGenre.findAll({
      where: filter,
      attributes: ['movieId'],
      raw: true,
      nest: true
    });
    console.log(data)
    //const datajson = JSON.parse(data); 
    let bulkId = []
    for (i=0; i < data.length; i++){
      
      bulkId.push(data[i].movieId)
    }
    console.log(bulkId)
    const movieData = await movieModel.findAll({
      attributes:['title','img_link','created_date'],
      where: {
        id: bulkId // Same as using `id: { [Op.in]: [1,2,3] }`
      }
    });
    
    return movieData
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

/////// exports
  module.exports = {
    getAll,
    getByGenreId,
    postMovie,
    getByFilter,
    getDetails
  }