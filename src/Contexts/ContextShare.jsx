import React, { createContext, useState } from 'react'

//to create context API, we use the method - createContext()
export const addAppResponseContext = createContext()

//to edit response
export const editAppResponseContext = createContext()


function ContextShare({children}) {
    //children is a pre-defined props used to share data between all components
    //create data that is to be shared
    const [addAppResponse, setAddAppResponse ] = useState({})

    const [editAppResponse , setEditAppResponse] = useState({})


  return (
    <>

    <addAppResponseContext.Provider value={{addAppResponse, setAddAppResponse}}>
        <editAppResponseContext.Provider value={{editAppResponse , setEditAppResponse}}>
            {children}
        </editAppResponseContext.Provider>
    </addAppResponseContext.Provider>

    </>
  )
}

export default ContextShare