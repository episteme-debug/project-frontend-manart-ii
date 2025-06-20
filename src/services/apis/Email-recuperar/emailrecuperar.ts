import axios from "axios";

export async function enviarCorreo(email: string) {
  try {
    const params = new URLSearchParams();
    params.append("email", email);

    const response = await axios.post(
      "http://localhost:8080/api/recuperar/recuperacion-contresena",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("El correo fue enviado con éxito");
  } catch (error) {
    console.error("Algo salió mal", error);
  }
}
