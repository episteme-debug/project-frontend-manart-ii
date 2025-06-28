import axios from "axios";

export async function eliminarArchivo(id: number) {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/archivomultimedia/private/eliminarporid/${id}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("id dela categoria", error);
    return [];
  }
}
