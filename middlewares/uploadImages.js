const multer = require("multer");
const sharp = require("sharp");
const path = require("path");


const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        
    },
    filename:function(req,file,cb){

    }
})

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});
