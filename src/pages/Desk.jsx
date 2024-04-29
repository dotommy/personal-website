import { useState, Suspense,useEffect, useRef } from 'react'

import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Scene from '../components/Scene/Scene'
import Monitor from '../components/Monitor/Monitor'
import Boot from '../assets/sounds/boot.mp3'
import gsap from 'gsap';
import Welcome from './Welcome'

export function SetPosition({isMobile}) {
  const camera = useThree(state => state.camera)

  // set Position and Rotation
  camera.position.set(0.5744641123056496, 1.4582801968300971, 6.986205049458597);
  camera.rotation.set(Math.PI / 80, Math.PI / 6, 0);
  console.log(camera)
  useFrame(() => {
    //console.log(camera)
  })
  useEffect(() => {
    //Animation start
    console.log("Test AUDIO")
    const boot = new Audio(Boot)
    boot.play()
    gsap.to(camera.rotation, {
      x: -0.09077336600309155,
      y: -0.2042883172204724,
      z: -0.01846387054654279,
      duration: 0.5,
      delay: 2, 
      ease: 'power2.inOut',
    });
    if (isMobile) {
      gsap.to(camera.position, {
        x: 0.2624150534996805,
        y: 1.676016424308098,
        z: 2.1744033218861403,
        duration: 2,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(camera.position, {
        x: 0.4624150534996805,
        y: 1.576016424308098,
        z: 1.1744033218861403,
        duration: 2,
        ease: 'power2.inOut',
      });
    }
  }, []);

}

function Desk() {
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const [start, setStart] = useState(false)
  function startScene() {
    setStart(true)
  }
  console.log(mobile)
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
      </Canvas>
    </>
  )
}

export default Desk
