import { useFrame } from "@react-three/fiber"
import { Plane } from "@react-three/drei"
import * as THREE from "three"
import { useRef, useEffect } from "react"
import { cnoise21 } from "../modules/glsl/noise"
import { ShaderMaterial } from "three"

const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
varying vec2 v_uv;

${cnoise21}

float random(vec2 p) {
  vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
  return fract(cos(dot(p, k1)) * 12345.6789);
}

const vec3 black = vec3(0.0);
const vec3 color1 = vec3(0.114, 0.173, 0.212);
const vec3 color2 = vec3(0.725, 0.776, 0.784);
const vec3 color3 = vec3(0.561, 0.522, 0.471);

void main() {
  vec2 seed = v_uv * 1.5 * (u_mouse + 0.3 * (length(u_mouse) + 0.5));
  float n = cnoise21(seed) + length(u_mouse) * 0.9;

  float ml = pow(length(u_mouse), 2.5) * 0.15;
  float n1 = smoothstep(0.0, 0.0 + 0.2, n);
  vec3 color = mix(black, color1, n1);
  
  float n2 = smoothstep(0.1 + ml, 0.1 + ml + 0.2, n);
  color = mix(color, color2, n2);

  float n3 = smoothstep(0.2 + ml, 0.2 + ml + 0.2, n);
  color = mix(color, color3, n3);

  float n4 = smoothstep(0.3 + ml, 0.3 + ml + 0.2, n);
  color = mix(color, black, n4);

  vec2 uvrandom = v_uv;
  uvrandom.y *= random(vec2(uvrandom.y, 0.4));
  color.rgb += random(uvrandom) * 0.05;

  gl_FragColor = vec4(color, 1.0);
}
`

const Background = () => {
  const materialRef = useRef<ShaderMaterial>(null!)
  const mouseRef = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.set(x, y)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(() => {
    if (!materialRef.current) return
    
    materialRef.current.uniforms.u_time.value += 0.005
    
    const targetX = (mouseRef.current.x + 1) * 0.5
    const targetY = (mouseRef.current.y + 1) * 0.5
    
    materialRef.current.uniforms.u_mouse.value.lerp(
      new THREE.Vector2(targetX, targetY), 
      0.1
    )
  })

  return (
    <Plane args={[2, 2]} scale={[10, 10, 1]}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2() },
        }}
      />
    </Plane>
  )
}

export default Background