import React, { createContext, useState } from 'react'


export let AppContext=createContext(2)


export default function AppContextProvider({children})
{
 let [cardNumber, setCardNumber] = useState(0)

    
   return (
  <AppContext.Provider value={{ cardNumber ,setCardNumber}}>
    {children}
  </AppContext.Provider>
)

    // 
}