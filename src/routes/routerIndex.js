const express = require("express")
const router =  express.Router()
const v1Controller = require('../controllers/controllers.js')

router.get("/", v1Controller.getAllinfo)

router.get("/:getId",v1Controller.getInfoByUser);

router.post("/", v1Controller.createUser);

//router.patch("/:patchId", v1Controller.updateOneWorkout);

//router.delete("/:deleteById", v1Controller.deleteOneWorkout);  

// exporting modules
module.exports = router
