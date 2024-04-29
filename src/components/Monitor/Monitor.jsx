/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 monitor.gltf 
Author: Brandon_Harvey (https://sketchfab.com/Brandon_Harvey)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/old-monitor-6fb5032d4c0f45c3b767c1a8d694ec70
Title: Old monitor
*/

import React, { useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import './Monitor.css'
import System from '../../pages/System'

export default function Model(props, {start}) {
  const { nodes, materials } = useGLTF('../../public/Monitor/monitor.gltf')
  return (
    <group {...props} dispose={null} rotation={[0, -0.2, 0]} position={[0.45, 1.5, 1.2]} scale={0.007}>
      <mesh geometry={nodes.Box001__0.geometry} material={materials['Scene_-_Root']} position={[5, -55, -100]} rotation={[-Math.PI / 2, 0, 0]} scale={1.65} />
      <Html
        transform
        scale={12.9}
        position={[5.5,2,-98]}
        distanceFactor={5.5}
      >
          <System/>
      </Html>
    </group>
  )
}

useGLTF.preload('/monitor.gltf')