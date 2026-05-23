import Contacto from "../models/Contacto.js";
import { enviarRespuesta } from "../services/emailService.js";
import { validationResult } from "express-validator";

export const crearMensaje = async (req, res) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });

    }

    if (req.file) {

      req.body.archivo = req.file.filename;

    }

    const contacto = new Contacto(req.body);

    await contacto.save();

    res.status(201).json({
      message: "Mensaje enviado correctamente",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error enviando mensaje",
    });

  }

};

export const obtenerMensajes = async (req, res) => {

  try {

    const mensajes = await Contacto.find()
      .sort({ createdAt: -1 });

    res.json(mensajes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error obteniendo mensajes",
    });

  }

};

export const responderMensaje = async (req, res) => {

  try {

    const { respuesta } = req.body;

    const contacto = await Contacto.findById(
      req.params.id
    );

    if (!contacto) {

      return res.status(404).json({
        message: "Mensaje no encontrado",
      });

    }

    await enviarRespuesta(
      contacto.email,
      respuesta
    );

    contacto.respuestaAdmin = respuesta;

    contacto.estado = "Respondido";

    contacto.fechaRespuesta = new Date();

    await contacto.save();

    res.json({
      message: "Respuesta enviada",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error respondiendo mensaje",
    });

  }

};