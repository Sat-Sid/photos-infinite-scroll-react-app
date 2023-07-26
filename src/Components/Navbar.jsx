import React from "react";

function Navbar(){
    return (
        <nav className="navbar sticky-top bg-light shadow-sm">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="./images/photos-app-logo.png" alt="Photos-logo" />
                </a>
            </div>
        </nav>
    );
}

export default Navbar;