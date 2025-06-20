import axios from "axios";

export default async function EnviarCorreo(nuevaContrasena: string ,token:string) {
  try {
    const params = new URLSearchParams();
    params.append("token",token);
    params.append("nuevaContrasena", nuevaContrasena);

    const response = await axios.post(
      "http://localhost:8080/api/recuperar/actulizar-contrasema",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("El cambio fue exitoso");
  } catch (error) {
    console.error("Algo salió mal", error);
  }
}
