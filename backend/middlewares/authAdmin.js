import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
 try {

const authHeader = req.headers.authorization;
if (!authHeader) {

return res.status(401).json({
 message: "No autorizado",
});
}

    // Extraer token después de "Bearer "
const token = authHeader.split(" ")[1];
const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

if (decoded.rol !== "admin") {
return res.status(403).json({
        message: "Acceso denegado",
      });
}

    req.usuario = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Token inválido",
    });

  }

};

export default authAdmin;