"use client"

import { useEffect, useState } from "react";
import { generarPago } from "@/api/pedido";
import FormularioPago from "@/components/FormularioPago";

export default function Home() {
    const [datosPayU, setDatosPayU] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const datos = await generarPago();
                setDatosPayU(datos);
            } catch (error) {
                console.error("Error al generar pago:", error);
            }
        };

        obtenerDatos();
    }, []);

    if (!datosPayU) {
        return <p>Cargando formulario de pago...</p>;
    }

    return (
        <div>
            <h2>Pago con PayU</h2>
            <p>{JSON.stringify(datosPayU)}</p>
            <FormularioPago datos={datosPayU} />
        </div>
    );
}
