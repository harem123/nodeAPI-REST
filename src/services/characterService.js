//TODO implement search by title filtering by gender to get ASC or DESC order movies 
const db = require("../../models/index.js");
const characterModel = db.character;
const associatedMovie= db.character_movie

// show all data 
const getAll= async() => {
  try{
    const data = await  characterModel.findAll({attributes:['name','img_link']})
      //console.log(movies)
      //const result = JSON.stringify(data)
    
      return data
  }
  catch(err){
    console.log(err)
  }  
}

const getByFilter= async(filter,model=characterModel) => {
  try{
    //TODO query should return only name and image
    //console.log(filter)
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
//TODO build character query by id movie
const getByMovieId= async(filter) => {
  try{
    //TODO pasar desde controlador todo el filtro 
    //console.log(filter)

    const data = await  associatedMovie.findAll({
      where: filter,
      attributes: ['characterId'],
      raw: true,
      nest: true
    });
    //TODO retunr find all id [1,2,3] is property of find all 
    //const datajson = JSON.parse(data); 
    let bulkId = []
    for (i=0; i < data.length; i++){
      //console.log(data[i].characterId)
      bulkId.push(data[i].characterId)
    }
    console.log(bulkId)
    const characterData = await characterModel.findAll({
      where: {
        id: bulkId // Same as using `id: { [Op.in]: [1,2,3] }`
      }
    });
    
    return characterData
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




// create users try catch doesnt work propertly
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
    getByMovieId
  }