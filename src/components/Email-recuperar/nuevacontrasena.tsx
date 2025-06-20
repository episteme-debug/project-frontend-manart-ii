'use client';
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import enviarCorreo from "../../services/apis/Email-recuperar/nuevacontrasena"
function nuevacontrasena({ token }: { token: string })  {



    const [nuevaContrasena, setnuevaContrasena] = useState("");
    const enviar = async () => {
        try {
            if (!token) {
                return alert("El token no es valido")
            }
            await enviarCorreo(nuevaContrasena, token)
        } catch (error) {
            alert("Error al enviar el correo");
        }
    }
    return (
        <section className='w-full h-screen  flex justify-center text-center '>
            <div className='shadow-2xl mt-5 mb-5 w-[50%]  ' >
                <div className='flex justify-center text-center w-full '>
                    <Image
                        src="/logo.png"
                        alt="Image"
                        width={400}
                        height={0}
                    />
                </div>
                <label htmlFor="" className='text-2xl '>Ingresa tu correo para recuperar la contraseña</label>
                <br />
                <input type="nuevaContrasena" name="nuevaContrasena" id="email"
                    value={nuevaContrasena} onChange={(e) => setnuevaContrasena(e.target.value)} className='shadow-2xl w-[80%] mb-2 mt-2 border-1 border-black' />
                <br />
                <Button onClick={enviar} className='w-[80%]'>Enviar correo</Button>
            </div>
        </section>
    )
}

export default nuevacontrasena