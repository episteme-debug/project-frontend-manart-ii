export interface Usuario {
  idUsuario: number;
  alias: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  emailUsuario: string;
  telefonoUsuario: string;
  numeroDocumentoUsuario: string;
  rolUsuario: string;
  hashContrasenaUsuario: string;
  // añade aquí más campos si vienen en tu DTO de respuesta
}