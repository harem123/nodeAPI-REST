


const v1Service = require('../services/services.js')

const getAllinfo = (req,res) => {
    // servicios previos a la respuesta
    const allData = v1Service.getAllData()
    // envio la respuesta
    res.send({status:"OK", data:allData});
}

const getInfoByUser = (req,res) => {
    const infoByUser = v1Service.getOneUser();
    res.send(infoByUser);
}


const createUser = async (req, res) => {
  const {body} = req
  if ( 
    !body.user_name ||
    !body.email 
  ){
    return
  }
 // inicializo la info
 const newUser = {
  user_name: body.user_name,
  password: body.password,
  email: body.email
 }
  //TODO buscar como funciona un post service sequelize
  //onst createdUser = usersModel.create(newUser);
  try {
    createdUser = await v1Service.postUser(newUser)
    res.status(201).send({status:"OK", userId: createdUser} );
  } catch (error) {
    res.status(500).send({status:"FAILED"});
  } 
};

  module.exports = {
    getAllinfo,
    getInfoByUser,
    createUser
  }

  