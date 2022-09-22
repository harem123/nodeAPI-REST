const db = require("../../models/index.js");
const usersModel = db.user;
const genreModel = db.genre;
const characterModel = db.character
// show all data 

const updater = async (value,filter) => {
  console.log(value)
  console.log(filter)
  const updatedRows = await characterModel.update(
    value,
    filter
  );
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