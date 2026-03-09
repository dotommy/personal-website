import { useState, useRef } from 'react'
import ReactGA from "react-ga4";
import TerminalBoot from '../components/TerminalBoot';
import './System.css'
import Keyboard1 from '../assets/sounds/keyboard.mp3'

const COMMANDS = ['about', 'linkedin', 'github', 'projects', 'contact', 'whoami', 'clear', 'help', 'echo'];

function System() {
    const keyboard = useRef(new Audio(Keyboard1))

    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isSystemStarted, setIsSystemStarted] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const terminalref = useRef()
    const textEndRef = useRef();

    function mainScroll(e) {
      terminalref.current.scrollBy(0, e.deltaY);
    }

    function setStartedSystem() {
      setIsSystemStarted(true)
    }

    const handleClick = () => {
      if (textEndRef.current) {
        textEndRef.current.focus();
      }
    };

    const handleInputChange = (e) => {
      setInput(e.target.value);
      setHistoryIndex(-1);
      keyboard.current.currentTime = 0
      keyboard.current.play()
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(next);
        setInput(history[next] ?? '');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = historyIndex - 1;
        if (next < 0) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(next);
          setInput(history[next] ?? '');
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const match = COMMANDS.find(cmd => cmd.startsWith(input.trim()) && cmd !== input.trim());
        if (match) setInput(match);
      }
    };

    const handleInputSubmit = (e) => {
      e.preventDefault();
      const cmd = input.trim();
      if (!cmd) return;

      const newOutput = [...output];
      newOutput.push(`root@guest: ${cmd}`);

      ReactGA.event({ category: 'Terminal', action: 'command', label: cmd });

      switch (cmd) {
        case 'about':
          newOutput.push('I graduated as a Technical Commercial Services\nspecialist with a focus on Commercial Promotion and Advertising,\nspecifically honing my skills in Web Design.\nFrom my early days in the programming world,\nI have nurtured my curiosity and creativity,\nconsistently seeking new ways to tackle\ncomplex challenges through code.');
          break;
        case 'whoami':
          newOutput.push('guest');
          break;
        case 'projects':
          newOutput.push('Projects:\n  personal-website: This site — React, Three.js, GSAP\n  More coming soon...');
          break;
        case 'contact':
          newOutput.push('Email: tommaso.frosini@example.com\nLinkedIn: linkedin.com/in/tommaso-frosini\nGitHub: github.com/dotommy');
          break;
        case 'linkedin':
          newOutput.push('Opening LinkedIn...');
          window.open("https://www.linkedin.com/in/tommaso-frosini/", "_blank")
          break;
        case 'github':
          newOutput.push('Opening GitHub...');
          window.open("https://github.com/dotommy", "_blank")
          break;
        case 'clear':
          setOutput([]);
          setInput('');
          setHistory(prev => [cmd, ...prev]);
          setHistoryIndex(-1);
          return;
        case 'help':
          newOutput.push('Available commands:\n  about      — a little presentation of mine\n  whoami     — current user\n  projects   — my projects\n  contact    — how to reach me\n  linkedin   — open LinkedIn profile\n  github     — open GitHub profile\n  clear      — clear the terminal\n  echo <msg> — print a message');
          break;
        default:
          if (cmd.startsWith('echo ')) {
            newOutput.push(cmd.replace('echo ', ''));
          } else {
            newOutput.push(`${cmd}: command not found. Type 'help' for available commands.`);
          }
          break;
      }

      setOutput(newOutput);
      setInput('');
      setHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);

      setTimeout(() => {
        if (terminalref.current) {
          terminalref.current.scrollTop = terminalref.current.scrollHeight;
        }
      }, 10);
    };

    return (
      <div className='system'>
        <div className='crt' onClick={handleClick} onWheel={(e) => {mainScroll(e)}}></div>
          <div className="Terminal" ref={terminalref}>
          <main className="terminal">
              <TerminalBoot text={`\"-----------------------------------------\nTerminal Boot Sequence\nVersion 3.1.0\n\nInitializing system components...\n\nLoading kernel modules.............. Done\nChecking hardware compatibility..... Done\nMounting file systems................. Done\nStarting network services............. Done\n\nWelcome to TerminalOS 3.1.0\n\nAccess granted. Welcome, guest!\n\nType 'help' for a list of available commands."
              `} delay={2000} endfunction={setStartedSystem}/>
              {isSystemStarted ? (
                <>
                  <div className="output">
                    {output.map((line, index) => (
                      <pre className="command-response" key={index}>{line}</pre>
                    ))}
                    </div>
                  <form onSubmit={handleInputSubmit} className="input-form">
                    <span>root@guest: </span>
                    <input
                      type="text"
                      className='command'
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      ref={textEndRef}
                    />
                  </form>
                </>
              ): (null)}
          </main>
        </div>
      </div>
    )
  }

export default System
