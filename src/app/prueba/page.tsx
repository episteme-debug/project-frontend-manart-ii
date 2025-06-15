"use client"

import axios from "axios"
import React from "react"

const baseURL = "https://jsonplaceholder.typicode.com/posts/2"
interface Post {
    body: string;
    id: number;
    title: string;
    userId: string
}

export default function Productos() {
    const [post, setPost] = React.useState<Post | null>(null)

    React.useEffect(() => {
        async function peticion() {
            try {
                const respuesta = await axios.get<Post>(baseURL)

                if (respuesta.status === 200) {
                    setPost(respuesta.data)
                    console.log("Petición exitosa")
                } else {
                    throw new Error("Ocurrió un error")
                }
            } catch (e) {
                console.log(e)
            }
        }

        peticion()
    }, [])

    if (!post) return null

    return (
        <div>
            <p>{post.id}</p>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>{post.userId}</p>
        </div>
    )
}
