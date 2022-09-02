import React, {useState} from 'react'; 
import PresentationList from './PresentationList'

const TopToolbar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src="https://www.leanwithdata.com/hubfs/lean-logo-1.svg" alt="Lean Analytics" className="leanlogo" />
            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <PresentationList />
                    </li>
                </ul>
            </div>
        </nav>        
    )
}
export default TopToolbar;