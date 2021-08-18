import React, { createContext, useEffect, useState } from 'react'
export const myContext = createContext({});

export default function Context(props) {

    const [userObject, setUserObject] = useState();

    useEffect(()=> {
        fetch('http://localhost:4000/get/user', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                console.log("Got User: ", data);
                setUserObject(data);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}
