import { useEffect, useState } from "react"

import data from "./loremText"
import './quickIpsum.css'

function Main() {
    const [value, setValue] = useState('')
    const [index, setIndex] = useState(0)

    const [isCopied, setIsCopied] = useState(false)
    const [isCopiedJSON, setIsCopiedJSON] = useState(false)
    const [showDonate, setShowDonate] = useState(false)

    let visibleData = null

    function typing(e) {
        setValue(e.target.value)
    }

    function submit(e) {
        e.preventDefault()
        const form = e.currentTarget
        // show built-in validation UI and abort if invalid
        if (!form.reportValidity()) return

        const input = form.querySelector('#paragraphs')
        const min = Number(input?.min) || 1
        const max = Number(input?.max) || 99
        const n = Math.max(min, Math.min(max, Number(value) || 0))

        // update index and reset copy/donate state
        setIndex(n)
        setIsCopied(false)
        setIsCopiedJSON(false)
        setShowDonate(false)
    }

    function copy() {
        navigator.clipboard.writeText(visibleData.map(item => item.text).join('\n\n'));
        setIsCopied(true)
        setIsCopiedJSON(false)
        setShowDonate(true)
    }

    function copyInJSON() {
        setIsCopiedJSON(true)
        setIsCopied(false)
        setShowDonate(true)

    const formatted = `[
${visibleData
    .map(item => `  {
    id: crypto.randomUUID(),
    text: ${JSON.stringify(item.text)}
  }`)
    .join(',\n')}
]`;

        navigator.clipboard.writeText(formatted);
    }


    if (index >= 1 && index <= 99) {
        visibleData = data.slice(0, index)
    }

    useEffect(() => {
        // Only start the timeout when the donate card is shown
        if (!showDonate) return

        const id = setTimeout(() => {
            setShowDonate(false)
        }, 10000)

        // Clear timeout if showDonate changes or component unmounts
        return () => clearTimeout(id)
    }, [showDonate])

    return (
        <div className="main">
           <h1><span>Quick</span> ipsum</h1>
           <p className="slogan">Clean dummy text, instantly. Create up to <span className="slogan-catcher">99</span> paragraphs.</p>
           

           <form onSubmit={submit}>
            <label htmlFor="paragraphs">Paragraphs: </label>
            <input id="paragraphs" type="number" min={1} max={99} value={value} onChange={typing} required />
            <button type="submit" className="submit">Generate</button>
           </form>

           <div className="generated-text">
            <div style={{display: 'flex', gap: '10px'}}>
                {visibleData && <button className="copy" onClick={copy}>{isCopied ? "Copied!" : "Copy"}</button>}
                {visibleData && <button className="super-copy" onClick={copyInJSON}>{isCopiedJSON ? "Copied!" : "Copy in JSON"}</button>}
                
            </div>

            {visibleData && visibleData.map(({id, text}) => {
                return (
                    <p key={id} className="para">{text}</p>
                )
            })}

            {visibleData && '---------------------------------------------------------------------------------------------'}
            {visibleData && <p className="donate-text">If you have found this website useful, you can always <a className="donate-text-catcher" href="https://buymeacoffee.com/davidmacaskill" target="_blank" rel="noopener noreferrer">buy me a coffee</a></p>}

            
           </div>

           {showDonate && <div className="the-nice-one-container">
                <span className="the-nice-one-close" onClick={() => {setShowDonate(false)}}>&#10006;</span>
                <p>You can always <a href="https://buymeacoffee.com/davidmacaskill" target="_blank" rel="noopener noreferrer">Buy me a coffee &#9749;</a></p>
                <div className="donate-progress" aria-hidden="true" />
            </div>}
        </div>
        
    )
}

export default Main