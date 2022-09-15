const uploadFile = require("../services/uploadService.js");
const v1ServiceMovie = require('../services/movieServices.js')
const db = require("../../models/index.js");
const genreAssociateModel = db.genre_movie;
const fs = require("fs");
// aqui ojo esta la direccion donde apunto el descargar la imagen 
const baseUrl = "http://localhost:3000/";

const upload = async (req, res) => {
  try {
    
    await uploadFile(req, res);
    console.log(req.file.originalname);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const arras = req.body.movieArr
    const dataj = JSON.parse(arras); 
    /*
    for (i = 0; i < dataj.length; i++) {
      console.log(dataj[i]);
    } 
    */
    const title = req.body.title
    const score = req.body.score
    const link = baseUrl + req.file.originalname
    //// metiendo mano 
    const newMovie= {
      title: title,
      img_link: link,
      score: score
     }

     createdMovie = await v1ServiceMovie.postMovie(newMovie)
    /// insertcion edn
    /// creando asociaciones
    /// para crear el bulk debo inseertar la fecha de creacioon y actulizacion 
  /*  const arra = [1,2,3]
const id = 9
const bulki =  []	
//console.log(arra.length)
for (i=0; i< dataj.length;i++	){
	//console.log(arra[i])
const preArray = {movieId: id, genreId: dataj[i]}	
bulki.push(preArray)
    console.log(preArray)}
 genreAssociateModel.bulkCreate([bulki])
 */
    //console.log(arrs)
    for (i = 0; i < dataj.length; i++) {
       const arras= {
           movieId: 34,
           genreId: dataj[i]
          }
   
          genreAssociateModel.create(arras);
     } 
   
    // fin asociaones
    console.log(title)
    console.log(score)

    res.status(200).send({
      message: "Uploaded the file successfully: " + arras,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/images";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    } 

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const remove = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};

const removeSync = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  try {
    fs.unlinkSync(directoryPath + fileName);

    res.status(200).send({
      message: "File is deleted.",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete the file. " + err,
    });
  }
};



module.exports = {
    upload,
    getListFiles,
    download,
    remove,
    removeSync,
  };
  