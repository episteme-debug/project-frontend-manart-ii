'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { enviarCorreo } from "../../services/apis/Email-recuperar/emailrecuperar"
export default function EmailRecuperar() {
  const [email,setemail] = useState("");

  const enviar = async ()=>{
   try {
    await enviarCorreo(email);
    alert("Correo enviado con éxito");
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
        <input type="email" name="email" id="email"
        value={email} onChange={(e)=>setemail(e.target.value)} className='shadow-2xl w-[80%] mb-2 mt-2 border-1 border-black' />
        <br />
        <Button onClick={enviar} className='w-[80%]'>Enviar correo</Button>
      </div>
    </section>
  )
}
