const db = require("../../models/index.js");
const usersModel = db.user;
const genreModel = db.genre;
const characterModel = db.character
// show all data 
//TODO review correct response
const updater = async (value,filter,model) => {
  console.log(value)
  console.log(filter)
  const updatedRows = await model.update(
    value,
    filter
  )
  console.log(updatedRows)
}

const destroyer = async (filter,model) => {
  const row = await model.findOne({
    where: filter,
  });
  
  if (!row) {return "no data"}
   const result = await row.destroy()
   console.log(result)
    return result
  
}

  module.exports = {
    
    destroyer,
    updater
  
  }