import React, { createContext, useEffect, useState } from 'react'
export const myContext = createContext({});

export default function Context(props) {

    const [userObject, setUserObject] = useState();
    useEffect(()=> {
        fetch('http://localhost:4000/get/user', { credentials: 'include' })
            .then(response => {
                //console.log("Response: ", response)
                return response.json()
            })
            .then(data => {
                console.log("Got User: ", data);
                setUserObject(data);
            })
            .catch(err => {
                console.log("Got error instead");
                if (window.location.href !== 'http://localhost:3000/login'){
                    window.location = '/login'
                }
                console.error(err)});
    }, []);
    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}
