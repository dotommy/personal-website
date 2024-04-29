import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './Welcome.css'

function Welcome({start}) {
    const [hide, setHide] = useState('')

    const { progress } = useProgress()
    useEffect(() => {
        console.log(progress)
    })

    function startScene() {
        start()
        setInterval(() => {setHide('hide')},200)
    }

    return (
        <div className={`welcome ${hide}`}>
            <div className='container-welcome'>
                <div className='container-description'><div>Tommaso Frosini Website</div><div style={{position:'relative', marginLeft: '2px'}}><div className='blink'>_</div></div></div>
                <div className='container-button'><button className='welcome-button' disabled={progress<100} onClick={startScene}>Enter</button></div>
            </div>
        </div>
    )
    }

export default Welcome
