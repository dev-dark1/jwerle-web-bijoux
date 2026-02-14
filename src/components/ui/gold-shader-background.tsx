"use client"

import React, { useRef, useEffect } from "react"

export function GoldShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float t = time * 0.5;
        
        float strength = 0.0;
        
        // Fluid gold movement
        for(float i = 1.0; i < 4.0; i++){
            uv.x += 0.1 * sin(uv.y * 3.0 + t);
            uv.y += 0.1 * cos(uv.x * 3.0 + t * 0.5);
            strength += 1.0 / abs(sin(uv.x * (5.0 + i) + t) * 5.0 + cos(uv.y * (10.0 + i) + t * 0.5));
        }

        // Gold Color Palette
        vec3 col = vec3(0.83, 0.68, 0.21) * strength * 0.3; // Gold base
        col += vec3(0.1, 0.1, 0.1); // Add some darkness
        
        gl_FragColor = vec4(col, 1.0);
      }
    `

    // Compile Shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vertexShader, vertexShaderSource)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fragmentShader, fragmentShaderSource)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Buffers
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const timeLocation = gl.getUniformLocation(program, "time")
    const resolutionLocation = gl.getUniformLocation(program, "resolution")

    let startTime = Date.now()
    let animationId: number

    const render = () => {
      const time = (Date.now() - startTime) / 1000
      gl.uniform1f(timeLocation, time)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      
      animationId = requestAnimationFrame(render)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resize)
    resize()
    render()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-20 opacity-40 pointer-events-none mix-blend-screen" 
    />
  )
}
