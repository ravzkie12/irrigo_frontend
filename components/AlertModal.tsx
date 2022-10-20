import React from 'react'

interface AlertModalParams {
    alertText: string;
    alertType: string;
    onAlertClick?(): void;
}

const AlertModal = ({ alertText, alertType, onAlertClick }: AlertModalParams) => {
    return (
        <div className={`z-10 absolute bottom-10 right-10 min-w-[24rem] max-w-[24rem] ${ alertType === 'error' ? 'bg-rose-50' : 'bg-cyan-50' }  px-8 py-5 flex justify-between items-center shadow-md rounded-lg`}>
            <p className={`${ alertType === 'error' ? 'text-rose-500' : 'text-cyan-600' } text-sm font-noto font-medium`}>{ alertText }</p>
            <button 
                onClick={ onAlertClick }
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={`${ alertType === 'error' ? 'text-rose-500' : 'text-cyan-600' } w-5 h-5`}
                >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    )
}

export default AlertModal