const multer = require('multer');
const path = require('path');

//prueba path 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadsPath = path.join(__dirname, '../../uploads');
      cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });


// Filtrar los tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes.'), false); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
module.exports = upload;