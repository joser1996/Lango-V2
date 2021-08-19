import React from 'react'

export default function ReviewHeader() {
    const goToHome = () => {
        console.log("Go to home")
    };

    return (
        <header id="reviewHeader">
            <div id="addDiv">
                <button id="addButton" onClick={goToHome}></button>
            </div>
            <h1>Lango!</h1>
        </header>
    )
}
