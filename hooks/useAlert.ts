import { useState } from 'react'

const useAlert = () => {
    const [showAlert, setShowAlert] = useState(false)

    const onShowAlert = () => {
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }

    const onCloseAlert = () => {
        setShowAlert(false)
    }

    return {
        showAlert, 
        onShowAlert,
        onCloseAlert
    }
}

export default useAlert