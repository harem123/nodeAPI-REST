const db = require("../../models/index.js");
const usersModel = db.user;




const getAllData= () => {
  const data = usersModel.findAll({attributes:['email','name']})
  .then(usuarios => {
      const resultados = JSON.stringify(usuarios)
      console.log(resultados)
  })
  .catch(error => {
      console.log(error)
  })
  return data
}

const getOneUser = () => {
    const userInfo = "user info by id"
  
    return userInfo
}

const  postUser = async (userBody) => {
  try{
    const createResult = await usersModel.create(userBody)
  
    console.log(createResult.id)
    return (createResult.id)
  }
  

  catch(error){
    console.log(error)
  }
  
  
  
}

  module.exports = {
    getAllData,
    getOneUser,
    postUser
  
  }