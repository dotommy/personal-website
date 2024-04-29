import React, { useState, useEffect } from 'react';

const TerminalBoot = ({text, delay, endfunction }) => {
    const [displayText, setDisplayText] = useState('');
    
    function numberWords(words) {
        const lettere = words.match(/[a-zA-Z]/g);
        return lettere ? lettere.length : 0;
    }

    useEffect(() => {
        const bootText = text;
        let index = 0;

        const number_words = numberWords(bootText)
        
        const intervalId = setInterval(() => {
        if (index <= bootText.length) {
            setDisplayText(bootText.slice(0, index));
            index++;
        } else {
            clearInterval(intervalId);
            if (typeof endfunction === 'function'){
                setInterval(() => {endfunction()},500)
            }
        }
        }, delay/number_words);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <pre className="terminal-boot">{displayText}</pre>
    );
};

export default TerminalBoot;