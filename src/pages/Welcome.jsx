import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import ReactGA from "react-ga4";
import CookieConsent, { Cookies } from "react-cookie-consent";
import './Welcome.css'

function Welcome({start}) {
    const [hide, setHide] = useState('')
    const [acceptCookie, setacceptCookie] = useState(false)
    const { progress } = useProgress()

    useEffect(() => {
        const isCookieAccepted = Cookies.get('CookieConsent') === 'true';
        setacceptCookie(isCookieAccepted);
    }, []);

    const handleAcceptCookie = () => {
        setacceptCookie(true)
    }

    function startScene() {
        ReactGA.initialize("G-WWVWGSW5NR");
        start()
        setInterval(() => {setHide('hide')},200)
    }

    return (
        <div className={`welcome ${hide}`}>
            <CookieConsent
                onAccept={handleAcceptCookie}
                buttonText="Accept"
                buttonWrapperClasses="cookie-button-wrapper"
                buttonClasses="cookie-button"
            >
                This website uses cookies to enhance the user experience. Click "Accept" to enable the "Enter" button
            </CookieConsent>
            <div className='container-welcome'>
                <div className='container-description'><div>Tommaso Frosini Website</div><div style={{position:'relative', marginLeft: '2px'}}><div className='blink'>_</div></div></div>
                <div className='container-button'><button className='welcome-button' disabled={progress < 100 || !acceptCookie} onClick={startScene}>Enter</button></div>
            </div>
        </div>
    )
    }

export default Welcome
