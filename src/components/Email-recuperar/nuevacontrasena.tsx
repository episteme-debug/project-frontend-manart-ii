'use client';
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import enviarCorreo from "../../services/apis/Email-recuperar/nuevacontrasena"
function nuevacontrasena({ token }: { token: string }) {
    const [nuevaContrasena, setnuevaContrasena] = useState("");
    const [confirmacion, setconfirmacion] = useState("");
    const [mostrarContrasena, setmostrarContrasena] = useState(false);
     const [mostrarconfirmaciona, setmostrarconfirmacion] = useState(false);
    const [tipoContrasena, settipoContrasena] = useState<'password' | 'text'>('password');
        const [tipoconfirmaciona, settipoconfirmaciona] = useState<'password' | 'text'>('password');
    const enviar = async () => {

        try {
            if (!token) {
                return alert("El token no es valido")
            }
            if (nuevaContrasena == confirmacion) {
                await enviarCorreo(nuevaContrasena, token)
            } else {
                alert("las contraseña no coincide")
            }
            return alert("Cambio exitoso")
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
                <label htmlFor="" className='text-2xl '>Introduce tu nueva contraseña</label>
                <br />
                    <input type={tipoContrasena} name="nuevaContrasena" id="nueva_contrasena" placeholder='Nueva contraseña'
                        value={nuevaContrasena} onChange={(e) => setnuevaContrasena(e.target.value)} className='shadow-2xl w-[80%] mb-2 mt-2 border-1 border-black' />

                    <button className='absolute r-10 t-50 translate-y-[40%] translate-x-[-120%] ' onClick={() => { setmostrarContrasena(!mostrarContrasena), settipoContrasena(tipoContrasena === 'password' ? 'text' : 'password') }}>

                        {mostrarContrasena ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )}
                    </button>

                <br />
                <input type={tipoconfirmaciona} name="nuevaContrasena" id="confirmar_contrasena" placeholder='Confirmar contraseña'
                    value={confirmacion} onChange={(e) => setconfirmacion(e.target.value)} className='shadow-2xl w-[80%] mb-2 mt-2 border-1 border-black' />
                    
                    <button className='absolute r-10 t-50 translate-y-[40%] translate-x-[-120%] ' onClick={() => { setmostrarconfirmacion(!mostrarconfirmaciona), settipoconfirmaciona(tipoconfirmaciona === 'password' ? 'text' : 'password') }}>

                        {mostrarconfirmaciona ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        ) : (
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        )}
                    </button>
                <br />
                <Button onClick={enviar} className='w-[80%]'>Enviar correo</Button>
            </div>
        </section>
    )
}

export default nuevacontrasena