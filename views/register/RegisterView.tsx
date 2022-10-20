import React from 'react'
import { useRouter } from 'next/router'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useSelector } from 'react-redux'
import AlertModal from '../../components/AlertModal'
import useAlert from '../../hooks/useAlert'

// #89644e

const RegisterView = () => {

    const router = useRouter()
    const { currentStep, requestStatus } = useSelector((state: any) => state.authState)
    const { showAlert, onShowAlert, onCloseAlert } = useAlert()

    const onClickLink = (path: string) => {
        router.push(path)
    }

    const renderSteps = (currentStep: number) => {
        switch (currentStep) {
            case 0:
                return <Step1 />
            case 1:
                return <Step2 />
            case 2:
                return <Step3 onShowAlertEvent={ onShowAlert } />
            default:
                return 'Could not find step!';
        }
    }

    return (
        <div className="w-full h-screen grid grid-cols-register font-noto text-gray-700">
            {/*  */}
            <div className="relative w-full bg-register bg-cover flex flex-col justify-center items-center px-10">
                {/*  */}
                <div className="absolute w-full h-screen bg-gradient-to-b from-stone-700 to-[#89644e]  opacity-70"></div>
                {/*  */}
                <div className="absolute top-10 left-5 flex gap-x-1">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"  
                            preserveAspectRatio="xMidYMid meet" 
                            viewBox="0 0 24 24"
                            className="w-7 h-7 text-white"
                        >
                                <path 
                                    fill="currentColor" 
                                    d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z"
                                />
                        </svg>
                        <h4 className="text-4xl text-white font-black tracking-widest">Irrigo.</h4>
                </div>
                <div className="z-10 flex flex-col gap-y-16">                    
                    {/*  */}
                    <div className="flex flex-col gap-y-5">
                        <h4 className="text-4xl font-bold text-white">Create Account</h4>
                        <p className="text-xl text-white font-light tracking-wider">Complete regristation process to create your account</p>
                    </div>
                </div>
                {/*  */}
            </div>
            {/*  */}
            <div className="relative w-full bg-white flex flex-col gap-y-8 justify-center items-center px-20">
                { 
                    showAlert && 
                    <AlertModal 
                        alertText={ requestStatus === 201 ? 'Account registration successful' : 'Registration of account failed' } 
                        alertType={ requestStatus === 201 ? 'success' : 'error' }
                        onAlertClick={ onCloseAlert } 
                    /> 
                }
                {/*  */}
                <div className="absolute top-10 flex justify-between items-center">
                    {/*  */}
                    <div className="flex gap-x-20">
                        {/*  */}
                        <div className="flex flex-col items-center gap-y-2">
                            <div className="w-11 h-11 bg-[#89644e] rounded-full flex justify-center items-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className="w-5 h-5 text-white"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                            <p className="text-sm font-light text-[#89644e]">Basic Info</p>
                        </div>
                        {/*  */}
                        <div className="flex flex-col items-center gap-y-2">
                            <div className={`w-11 h-11 ${ currentStep > 0 ? 'bg-[#89644e]' : 'bg-gray-200' } rounded-full flex justify-center items-center`}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className={`w-5 h-5 ${ currentStep > 0 ? 'text-white' : 'text-gray-400' }`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                            <p className={`text-sm font-light ${ currentStep > 0 ? 'text-[#89644e]' : 'text-gray-700' }`}>Contact Info</p>
                        </div>
                        {/*  */}
                        <div className="flex flex-col items-center gap-y-2">
                            <div className={`w-11 h-11 ${ currentStep > 1 ? 'bg-[#89644e]' : 'bg-gray-200' } rounded-full flex justify-center items-center`}>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className={`w-5 h-5 ${ currentStep > 1 ? 'text-white' : 'text-gray-400' }`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </div>
                            <p className={`text-sm font-light ${ currentStep > 1 ? 'text-[#89644e]' : 'text-gray-700' }`}>Password</p>
                        </div>
                        {/*  */}
                    </div>
                </div>
                {/*  */}
                { renderSteps(currentStep) }
                <p className="text-sm font-light">Already have an account? <button className="text-[#89644e] font-medium" onClick={ () => onClickLink('/') }>Login</button></p>
            </div>
            {/*  */}
        </div>
    )
}

export default RegisterView