import { useState, useEffect, useCallback } from 'react'

interface WindowSize {
    width: number | null;
    height: number | null;
}

export const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
        width: null,
        height: null,
    }))

    const handleResize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize, { passive: true })
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [handleResize])

    return windowSize
}
