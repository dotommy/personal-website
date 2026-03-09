import { useState } from 'react'
import { useProgress } from '@react-three/drei'
import ReactGA from "react-ga4";
import CookieConsent from "react-cookie-consent";
import './Welcome.css'

function Welcome({start}) {
    const [fading, setFading] = useState(false)
    const [gone, setGone] = useState(false)
    const { progress } = useProgress()

    const handleAcceptCookie = () => {
        ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
        ReactGA.send("pageview");
    }

    function startScene() {
        start()
        setFading(true)
        setTimeout(() => setGone(true), 500)
    }

    if (gone) return null

    return (
        <div className={`welcome${fading ? ' fading' : ''}`}>
            <CookieConsent
                onAccept={handleAcceptCookie}
                buttonText="Accept"
                declineButtonText="Decline"
                enableDeclineButton
                declineButtonClasses="cookie-button"
                buttonWrapperClasses="cookie-button-wrapper"
                buttonClasses="cookie-button"
                setDeclineCookie
                style={{
                    background: 'black',
                    borderTop: '3pt solid white',
                    fontFamily: '"VT323", monospace',
                    fontSize: '18pt',
                    color: 'white',
                    alignItems: 'center',
                }}
                contentStyle={{ margin: '0 0 8px 0' }}
            >
                This website uses cookies for analytics. You can still enter without accepting.
            </CookieConsent>
            <div className='container-welcome'>
                <div className='container-description'><div>Tommaso Frosini Website</div><div style={{position:'relative', marginLeft: '2px'}}><div className='blink'>_</div></div></div>
                {progress < 100 && (
                    <div className='progress-bar-wrapper'>
                        <div className='progress-bar' style={{width: `${progress}%`}}></div>
                        <span className='progress-label'>{Math.round(progress)}%</span>
                    </div>
                )}
                <div className='container-button'><button className='welcome-button' disabled={progress < 100} onClick={startScene}>Enter</button></div>
            </div>
        </div>
    )
    }

export default Welcome
