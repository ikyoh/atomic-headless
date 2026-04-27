'use client'

import { createContext, useContext, useState } from "react"

const AsideContext = createContext(null)

export function AsideProvider({ children }) {

    const [isActive, setIsActive] = useState(false)


    const toggle = () => setIsActive(!isActive)

    return (
        <AsideContext.Provider value={{ isActive, setIsActive, toggle }}>
            {children}
        </AsideContext.Provider>
    )
}

export function useAside() {
    const context = useContext(AsideContext)

    if (!context) {
        throw new Error("useAside must be used inside AsideProvider")
    }

    return context
}
