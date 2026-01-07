import { useEffect, useState } from "react"
import { dataPara, dataWords } from "./loremText"
import './quickIpsum.css'

import { CiCircleQuestion } from "react-icons/ci";
import Navbar from "./navbar";
import MoreInfo from "./moreInfo";

function Main() {
    const [value, setValue] = useState('')
    const [isCopied, setIsCopied] = useState(false)
    const [isCopiedJSON, setIsCopiedJSON] = useState(false)
    const [showDonate, setShowDonate] = useState(false)
    const [type, setType] = useState('Paragraphs')
    const [isError, setIsError] = useState(false)

    const [visibleData, setVisibleData] = useState(null)
    const [isTooltip, setIsTooltip] = useState(false)

    function typing(e) {
        setValue(e.target.value)
        if (isError) setIsError(false)
    }

    function detectLength(e) {
        setType(e.target.value)
    }

    // Helper to group flat words into paragraphs of 120 words
    const formatIntoParagraphs = (wordsArray) => {
        const paragraphs = [];
        for (let i = 0; i < wordsArray.length; i += 100) {
            const chunk = wordsArray.slice(i, i + 100).join(' ');
            paragraphs.push({
                id: crypto.randomUUID(),
                text: chunk
            });
        }
        return paragraphs;
    };

    function submit(e) {
        e.preventDefault()
        const n = parseInt(value)
        if (isNaN(n) || n <= 0) return

        let tempVisible = null
        
        if (type === 'Paragraphs') {
            if (n <= 99) {
                tempVisible = dataPara.slice(0, n)
            } else {
                setIsError(true)
            }
        } 
        else if (type === 'Words') {
            if (n <= 4000) {
                const selectedWords = dataWords.slice(0, n);
                tempVisible = formatIntoParagraphs(selectedWords);
            } else {
                setIsError(true)
            }
        } 
        else if (type === 'Characters') {
            if (n <= 20000) {
                const allText = dataPara.map(p => p.text).join(' ');
                const charString = allText.slice(0, n);
                // Convert character slice to words to maintain the 120-word break logic
                const wordsFromChars = charString.split(' ');
                tempVisible = formatIntoParagraphs(wordsFromChars);
            } else {
                setIsError(true)
            }
        }

        if (tempVisible) {
            setVisibleData(tempVisible)
            setIsCopied(false)
            setIsCopiedJSON(false)
            setShowDonate(false)
            setIsError(false)
        }
    }

    function copy() {
        if (!visibleData) return
        const textToCopy = visibleData.map(item => item.text).join('\n\n')
        navigator.clipboard.writeText(textToCopy)
        setIsCopied(true)
        setIsCopiedJSON(false)
        setShowDonate(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function copyInJSON() {
        if (!visibleData) return
        const formatted = JSON.stringify(visibleData, null, 2)
        navigator.clipboard.writeText(formatted)
        setIsCopiedJSON(true)
        setIsCopied(false)
        setShowDonate(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        if (!showDonate) return
        const id = setTimeout(() => {
            setShowDonate(false)
        }, 10000)
        return () => clearTimeout(id)
    }, [showDonate])

    return (
        <>
            <Navbar />

            <div id="main">
                <h1><span>Quick</span> ipsum</h1>
                <p className="slogan">Generate clean and easily readable dummy text in an instant.<br />
                    <span className="span-for-catcher" style={{fontFamily: 'system-ui'}}>Create up to <span className="slogan-catcher">99 paragraphs</span>,
                    <span className="slogan-catcher"> 4,000 words</span> and
                    <span className="slogan-catcher"> 20,000 characters</span>.</span>
                    <CiCircleQuestion className="tooltip" onMouseEnter={() => {setIsTooltip(true)}} onMouseLeave={() => {setIsTooltip(false)}} />
                    {isTooltip && <div style={{position: "absolute", top: '-15px', left: '627px', width: '300px', textAlign: 'left', lineHeight: '20px', border: '1px solid grey', borderRadius: '5px', paddingLeft: "5px"}}>Paragraphs are automatically generated for words and characters</div>}
                </p>

                <form onSubmit={submit}>
                    <select className="dropdown" onChange={detectLength} value={type}>
                        <option value="Paragraphs">Paragraphs</option>
                        <option value="Words">Words</option>
                        <option value="Characters">Characters</option>
                    </select>

                    <input 
                        id="paragraphs" 
                        type="number" 
                        value={value}
                        placeholder="Enter number"
                        onChange={typing} 
                        required 
                    />
                    <button type="submit" className="submit">Generate</button>
                </form>

                {isError && <p className="error-msg" style={{color: 'red', marginTop: '10px'}}>Limit exceeded for {type}!</p>}

                <div className="generated-text">
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        {visibleData && (
                            <button className="copy" onClick={copy}>
                                {isCopied ? "Copied!" : "Copy"}
                            </button>
                        )}
                        {visibleData && (
                            <button className="super-copy" onClick={copyInJSON}>
                                {isCopiedJSON ? "Copied!" : "Copy in JSON"}
                            </button>
                        )}
                    </div>

                    {visibleData && visibleData.map(({ id, text }) => (
                        <p key={id} className="para">{text}</p>
                    ))}
                </div>

                {visibleData && (
  <tr>
    <td colSpan="100%" style={{ padding: 0 }}>
      <div style={{
        margin: 0,
        padding: 0,
        paddingTop: '60px',
        width: '50vw',
        position: 'relative',
        left: '0%',
        borderBottom: '1px solid #053908ff',
        height: '1px'
      }}></div>
    </td>
  </tr>
)}

                {showDonate && (
                    <div className="the-nice-one-container">
                        <span className="the-nice-one-close" onClick={() => setShowDonate(false)}>&#10006;</span>
                        <p>You can always <a href="https://buymeacoffee.com/davidmacaskill" target="_blank" rel="noopener noreferrer">Buy me a coffee &#9749;</a></p>
                        <div className="donate-progress" aria-hidden="true" />
                    </div>
                )}
            </div>

            <MoreInfo />

            <p className="donate-text">
                If you have found this website useful, you can always{" "}
                <a className="donate-text-catcher" href="https://buymeacoffee.com/davidmacaskill" target="_blank" rel="noopener noreferrer">
                    buy me a coffee
                </a>
            </p>
        </>
    )
}

export default Main