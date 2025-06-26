import axios, {AxiosError} from 'axios';

export async function generarPago() {
    const url = 'http://localhost:8080/api/pedido/private/comprar';
    try {
        // Se retornan los datos de PayU
        const response = await axios.post(url,
            {},
            {withCredentials: true}
        );
        console.log(response.data);
        return response.data;
    } catch (err) {
        const error = err as AxiosError;
        console.error("Error generando el pago:", error.response?.data);
        throw error;
    }
}