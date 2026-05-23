import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

});

export const enviarRespuesta = async (
  destino,
  respuesta
) => {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: destino,

    subject: "Respuesta PQRS",

    html: `
      <div>
        <h2>Respuesta a su solicitud</h2>
        <p>${respuesta}</p>
      </div>
    `,

  });

};