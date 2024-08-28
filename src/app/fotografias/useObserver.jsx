import { useEffect, useState, useRef } from "react";

export default function useObserver(options) {
    const [elements, setElements] = useState([])
    const [entries, setEntries] = useState([])

    const observer = useRef(new IntersectionObserver( observerEntries => {
        setEntries(observerEntries)
    }, options))

    useEffect(function() {
        const currentObserver = observer.current;
        currentObserver.disconnect()

        if(elements.length > 0) {
            elements.forEach(element => currentObserver.observe(element))
        }

        return function cleanUp() {
            if(currentObserver) {
                currentObserver.disconnect()
            }
        }
    }, [elements]) 

    return [observer.current, setElements, entries]
}