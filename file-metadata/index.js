const path = require('path');
const router = require('express').Router();
const multer = require('multer');

const upload = multer();

router.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.post(`/get-file-size/`, upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      name: req.file.originalname,
      size: req.file.size,
    });
  }
});

module.exports = router;