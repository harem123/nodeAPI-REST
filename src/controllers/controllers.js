const v1Service = require('../services/services.js')
// TODO review and eliminate all unused functions
// TODO build general functions like destroy and update for all controllers
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

// TODO review if it's required firs find the row to eliminate



  module.exports = {
    destroyer
  }

  