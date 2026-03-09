import { useState, Suspense,useEffect, useRef } from 'react'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import Scene from '../components/Scene/Scene'
import Monitor from '../components/Monitor/Monitor'
import Boot from '../assets/sounds/boot.mp3'
import gsap from 'gsap';
import Welcome from './Welcome'

export function SetPosition({isMobile}) {
  const camera = useThree(state => state.camera)
  const boot = useRef(new Audio(Boot))
  const settledRef = useRef({ active: false, base: null })
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Establishing shot — wide, high, lateral
    camera.position.set(1.8, 2.4, 5.0);
    camera.rotation.set(0.16, 0.63, 0);

    const finalPos = isMobile
      ? { x: 0.2624150534996805, y: 1.676016424308098, z: 2.1744033218861403 }
      : { x: 0.4624150534996805, y: 1.576016424308098, z: 1.1744033218861403 };
    const finalRot = { x: -0.09077336600309155, y: -0.2042883172204724, z: -0.01846387054654279 };

    const tl = gsap.timeline();

    // Dolly + arc: 0.8s delay → arrives at monitor ~2.5s
    tl.to(camera.position, {
      x: finalPos.x, y: finalPos.y,
      z: isMobile ? finalPos.z : 1.05, // slight overshoot on desktop
      duration: 1.7, delay: 0.8,
      ease: 'power3.inOut',
    }, 0);
    tl.to(camera.rotation, {
      ...finalRot,
      duration: 1.7, delay: 0.8,
      ease: 'power3.inOut',
    }, 0);

    // Micro overshoot settle (desktop only)
    if (!isMobile) {
      tl.to(camera.position, {
        z: finalPos.z, duration: 0.4, ease: 'power2.out',
        onComplete: () => {
          settledRef.current.base = { x: camera.position.x, y: camera.position.y, rx: camera.rotation.x, ry: camera.rotation.y };
          settledRef.current.active = true;
        },
      });
    } else {
      // Mobile: no overshoot, activate idle immediately after dolly
      tl.call(() => {
        settledRef.current.base = { x: camera.position.x, y: camera.position.y, rx: camera.rotation.x, ry: camera.rotation.y };
        settledRef.current.active = true;
      });
    }

    // Boot sound timed to camera arrival near monitor
    const soundTimeout = setTimeout(() => boot.current.play(), 1500);

    return () => {
      tl.kill();
      clearTimeout(soundTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(({ clock }) => {
    if (!settledRef.current.active || !settledRef.current.base) return;
    const t = clock.elapsedTime;
    const { x, y, rx, ry } = settledRef.current.base;

    // Position idle drift (sempre attiva, molto sottile)
    camera.position.x = x + Math.sin(t * 0.37) * 0.0008;
    camera.position.y = y + Math.sin(t * 0.53) * 0.0015;

    if (!window.__terminalActive) {
      // Mouse look: lerp rotazione verso il target basato sul mouse
      const targetRY = ry + mouseRef.current.x * 0.05;
      const targetRX = rx + mouseRef.current.y * -0.03;
      camera.rotation.y += (targetRY - camera.rotation.y) * 0.04;
      camera.rotation.x += (targetRX - camera.rotation.x) * 0.04;
    } else {
      // Terminale attivo: ritorno smooth alla rotazione base
      camera.rotation.y += (ry - camera.rotation.y) * 0.04;
      camera.rotation.x += (rx - camera.rotation.x) * 0.04;
    }
  });
}

function Desk() {
  const [mobile] = useState(window.innerWidth <= 500);
  const [start, setStart] = useState(false)
  function startScene() {
    setStart(true)
  }
  return (
    <>
      <Welcome start={startScene} />
      <Canvas>
        <ambientLight/>
        <Suspense fallback={null}>
          <Scene/>
          {start ? (<Monitor/>) : (null)}
        </Suspense>
        <Environment preset='night'/>
        {start ? (<SetPosition isMobile={mobile} />) : (null)}
        <EffectComposer>
          <Bloom intensity={0.4} luminanceThreshold={0.65} luminanceSmoothing={0.85} />
          <Vignette offset={0.35} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </>
  )
}

export default Desk
