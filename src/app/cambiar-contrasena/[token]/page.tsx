import React from 'react'
import Nuevacontrasena from "../../../components/Email-recuperar/nuevacontrasena"

function page({ params }: { params: { token: string } })  {
  return (
    <div>
      <Nuevacontrasena token={params.token} />
    </div>
    
  )
}

export default page