'use client'

import { useEffect, useRef } from "react"
import { useWindowSize } from "@/hooks/useWindowSize"
import gsap from "gsap"

export default function SmokeTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<any[]>([])
    const { width, height } = useWindowSize()

    useEffect(() => {
        // Verificar si estamos en el cliente y el canvas existe
        if (typeof window === "undefined" || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        if (!ctx || width === null || height === null) return

        // Ajustar el tamaño del canvas al tamaño de la ventana
        canvas.width = width
        canvas.height = height

        // Seguir la posición del mouse
        const handleMouseMove = (e: MouseEvent) => {
            createSmoke(e.clientX, e.clientY)
        }

        window.addEventListener("mousemove", handleMouseMove)

        // Función para crear nuevas partículas
        const createSmoke = (x: number, y: number) => {
            // Crear una nueva partícula
            const particle = {
                x,
                y,
                size: Math.random() * 15 + 5,
                alpha: 1,
            }

            particlesRef.current.push(particle)

            // Animar la partícula con GSAP
            gsap.to(particle, {
                alpha: 0,
                size: particle.size + 10,
                y: particle.y - 30,
                duration: 1.5,
                ease: "power1.out",
                onUpdate: () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    // Redibujar todas las partículas
                    particlesRef.current.forEach((p) => {
                        ctx.beginPath()
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                        ctx.fillStyle = `rgba(204, 204, 204, ${p.alpha})`
                        ctx.fill()
                    })
                },
                onComplete: () => {
                    // Eliminar la partícula cuando termine la animación
                    particlesRef.current = particlesRef.current.filter((p) => p !== particle)
                },
            })
        }

        // Limpieza al desmontar
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [width, height]) // Ahora el useEffect depende de width y height

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <canvas
                ref={canvasRef}
                style={{
                    background: "#000",
                }}
            />
        </div>
    )
}
