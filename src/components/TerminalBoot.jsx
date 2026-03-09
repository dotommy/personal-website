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
        let timeoutId;

        const number_words = numberWords(bootText);
        const intervalMs = delay / number_words;

        function tick() {
            if (index <= bootText.length) {
                setDisplayText(bootText.slice(0, index));
                index++;
                timeoutId = setTimeout(tick, intervalMs);
            } else {
                if (typeof endfunction === 'function') {
                    timeoutId = setTimeout(endfunction, 500);
                }
            }
        }

        timeoutId = setTimeout(tick, intervalMs);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <pre className="terminal-boot">{displayText}</pre>
    );
};

export default TerminalBoot;