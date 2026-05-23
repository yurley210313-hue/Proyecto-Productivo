import multer from "multer";

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");

  },

  filename: (req, file, cb) => {

    const nombre =
      Date.now() + "-" + file.originalname;

    cb(null, nombre);

  },

});

const fileFilter = (req, file, cb) => {

  const tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];

  if (
    tiposPermitidos.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Tipo de archivo no permitido"
      ),
      false
    );

  }

};

const upload = multer({

  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,

});

export default upload;