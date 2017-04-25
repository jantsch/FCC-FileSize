var express = require('express');
var router = express.Router();
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    var getFileExt = function(fileName) {
      var fileExt = fileName.split(".");
      if (fileExt.length === 1 || (fileExt[0] === "" && fileExt.length === 2)) {
        return "";
      }
      return fileExt.pop();
    };
    cb(null,file.originalname + '.' + getFileExt(file.originalname));
  }
});

var multerUpload = multer({
  storage: storage
});

/* GET users listing. */
router.post('/', multerUpload.single('file'), function(req, res, next) {
	
    var fileDetails = {
        name: req.file.originalname,
        size: req.file.size,       
      };
    res.send(fileDetails);
  
});

module.exports = router;
