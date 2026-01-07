import { useState } from 'react'
import './navbar.css'



function Navbar() {
    const [toggleNav, setToggleNav] = useState(false)

    return (
        <nav>
            <div className="heading">    
                <a href="#main">Quick ipsum</a>
            </div>

            <div className="desktop">
                <div className="extra">
                    <a href="#lorem-ipsum">Lorem ipsum</a>
                    <a href="#about">About</a>
                    <a href="#report-a-bug">Report a bug</a>
                </div>


                <div className="button-class">
                    <a className="support" href="https://buymeacoffee.com/davidmacaskill" target='_blank'>Support &#9749;</a>
                </div>
            </div>

            <div className="mobile">
                <div className="toggle-container">
                    <span className="material-symbols-outlined" style={{fontSize: '2.5rem'}} onClick={() => {setToggleNav(!toggleNav)}}>
                        {!toggleNav ? 'menu' : 'close'}
                    </span>
                </div>

                <div className={`extra-mobile ${toggleNav ? 'open' : ''}`}>
                    <a href="#lorem-ipsum">Lorem ipsum</a>
                    <a href="#about">About</a>
                    <a href="#report-a-bug">Report a bug</a>
                    <a href="buymeacoffee.com/davidmacaskill" target='_blank'>Support &#9749;</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar