import React, {useState, useRef} from 'react'
import TerminalBoot from '../components/TerminalBoot';
import './System.css'
import Keyboard1 from '../assets/sounds/keyboard.mp3'
function System() {
    const keyboard = new Audio(Keyboard1)
    
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [isSystemStarted, setIsSystemStarted] = useState(false);

    const systemref = useRef()
    const terminalref = useRef()
    const mainref = useRef()
    const textEndRef = useRef();

    function mainScroll(e) {
      console.log(e.deltaY)
      const amount = e.deltaY
      terminalref.current.scrollBy(0, amount);
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
      keyboard.play()
    };
  
    const handleInputSubmit = (e) => {
      e.preventDefault();
      const newOutput = [...output];
      newOutput.push(`root@guest: ${input.trim()}`);

      switch (input.trim()) {
        case 'about':
          newOutput.push('I graduated as a Technical Commercial Services\nspecialist with a focus on Commercial Promotion and Advertising,\nspecifically honing my skills in Web Design.\nFrom my early days in the programming world,\nI have nurtured my curiosity and creativity,\nconsistently seeking new ways to tackle\ncomplex challenges through code.');
          break;
        case 'linkedin':
          newOutput.push('Here is my linkedin');
          window.open("https://www.linkedin.com/in/tommaso-frosini/", "_blank")
          break;
        case 'github':
          newOutput.push('Here is my Github');
          window.open("https://github.com/dotommy", "_blank")
          break;
        case 'help':
          newOutput.push('Available commands:\n  about: a little presentation of mine\n  linkedin: My LinkedIn profile\n  github: My Github profile');
          break
        default:
          if (input.trim().startsWith('echo ')) {
            const message = input.trim().replace('echo ', '');
            newOutput.push(message);
          } else {
            newOutput.push(`${input.trim()}: command not found`);
          }
          break;
      }
      setTimeout(function () {
        terminalref.current.scrollBy(0, 110)
      },2);
      setOutput(newOutput);
      setInput('');
    };

    return (
      <div className='system' ref={systemref}>
        <div className='crt' onClick={handleClick} onWheel={(e) => {mainScroll(e)}}></div>
          <div className="Terminal" ref={terminalref}>
          <main className="terminal" ref={mainref}>
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
