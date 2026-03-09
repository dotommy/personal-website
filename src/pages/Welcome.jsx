import { useState } from 'react'
import { useProgress } from '@react-three/drei'
import ReactGA from "react-ga4";
import CookieConsent from "react-cookie-consent";
import './Welcome.css'

function Welcome({start}) {
    const [hide, setHide] = useState('')
    const { progress } = useProgress()

    const handleAcceptCookie = () => {
        ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
        ReactGA.send("pageview");
    }

    function startScene() {
        start()
        setTimeout(() => {setHide('hide')}, 200)
    }

    return (
        <div className={`welcome ${hide}`}>
            <CookieConsent
                onAccept={handleAcceptCookie}
                buttonText="Accept"
                declineButtonText="Decline"
                enableDeclineButton
                declineButtonClasses="cookie-button"
                buttonWrapperClasses="cookie-button-wrapper"
                buttonClasses="cookie-button"
                setDeclineCookie
            >
                This website uses cookies for analytics. You can still enter without accepting.
            </CookieConsent>
            <div className='container-welcome'>
                <div className='container-description'><div>Tommaso Frosini Website</div><div style={{position:'relative', marginLeft: '2px'}}><div className='blink'>_</div></div></div>
                <div className='container-button'><button className='welcome-button' disabled={progress < 100} onClick={startScene}>Enter</button></div>
            </div>
        </div>
    )
    }

export default Welcome
