import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Custom GLSL shader: fresnel rim + flowing simplex-noise displacement
/*  + iridescent gradient between Electric Indigo and Neon Cyan.
/* ------------------------------------------------------------------ */
const noiseHelpers = /* glsl */ `
  // Classic 3D simplex noise (Ashima)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
`;
/* ------------------------------------------------------------------ */
/*  Glass orb — physically based transmission material with a subtle
/*  noise-driven vertex displacement injected via onBeforeCompile. The
/*  result is a refractive, dispersive sphere that picks up real
/*  environment lighting instead of looking like an AI noise blob.
/* ------------------------------------------------------------------ */
function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  const onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.vertexShader = `uniform float uTime;\n${noiseHelpers}\n${shader.vertexShader}`.replace(
      "#include <begin_vertex>",
      `
      float _n = snoise(position * 0.9 + vec3(uTime * 0.18));
      vec3 transformed = position + normal * (_n * 0.06);
      `
    );
  };

  useFrame(({ clock, pointer }, delta) => {
    uniforms.uTime.value = clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x +=
        (pointer.y * 0.3 - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y +=
        (pointer.x * 0.3 - groupRef.current.rotation.y) * 0.02;
    }
    if (innerRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.4) * 0.04;
      innerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.35}>
        {/* Inner glowing core that refracts through the glass shell */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.78, 4]} />
          <meshBasicMaterial color="#5C3BFF" />
        </mesh>

        {/* Glass shell */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.55, 96]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.4}
            roughness={0.08}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropy={0.3}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.1}
            clearcoat={1}
            clearcoatRoughness={0.05}
            color="#E8F4FF"
            attenuationColor="#9BE6FF"
            attenuationDistance={1.2}
            backside
            samples={6}
            resolution={512}
            onBeforeCompile={onBeforeCompile}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Lattice: two counter-rotating wireframe icosahedra that pulse with
/*  a sine wave + a delicate equatorial ring.
/* ------------------------------------------------------------------ */
function Lattice() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const s = 1 + Math.sin(t * 0.6) * 0.015;
    if (a.current) {
      a.current.rotation.y -= delta * 0.14;
      a.current.rotation.x += delta * 0.03;
      a.current.scale.setScalar(s);
    }
    if (b.current) {
      b.current.rotation.y += delta * 0.18;
      b.current.rotation.z -= delta * 0.05;
      b.current.scale.setScalar(2 - s);
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.22;
      ring.current.rotation.x = Math.sin(t * 0.2) * 0.5;
    }
  });

  return (
    <>
      <mesh ref={a}>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial wireframe color="#9BE6FF" transparent opacity={0.08} />
      </mesh>
      <mesh ref={b}>
        <icosahedronGeometry args={[2.55, 2]} />
        <meshBasicMaterial wireframe color="#5C3BFF" transparent opacity={0.05} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[2.8, 0.006, 8, 200]} />
        <meshBasicMaterial color="#00F5D4" transparent opacity={0.4} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Orbital particles: flow along curl-like noise around the orb with a
/*  custom point shader (size attenuation + soft circular alpha).
/* ------------------------------------------------------------------ */
const COUNT = 380;

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      // thin shell, further from orb
      const r = 2.9 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random();
    }
    return { positions, seeds };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#00F5D4") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          attribute float aSeed;
          varying float vSeed;
          uniform float uTime;
          void main(){
            vSeed = aSeed;
            vec3 p = position;
            float t = uTime * (0.25 + aSeed * 0.6);
            // gentle orbital sway
            p.x += sin(t + aSeed * 6.28) * 0.15;
            p.y += cos(t * 1.3 + aSeed * 6.28) * 0.15;
            p.z += sin(t * 0.7 + aSeed * 3.14) * 0.15;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.4 + aSeed * 2.4) * (300.0 / -mv.z);
          }
        `}
        fragmentShader={/* glsl */ `
          varying float vSeed;
          uniform vec3 uColor;
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d) * (0.18 + vSeed * 0.35);
            vec3 col = mix(uColor, vec3(0.85, 0.78, 1.0), vSeed);
            gl_FragColor = vec4(col, a);
          }
        `}
      />
    </points>
  );
}

export function HeroScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
        <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#5C3BFF" />
        <Environment preset="city" />
        <Orb />
        <Lattice />
        <Particles />
      </Canvas>
    </div>
  );
}