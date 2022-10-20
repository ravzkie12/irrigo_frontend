import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'

const RSBSAView = () => {

    const { rsbsaStep } = useAppSelector((state: any) => state.dataState)

    const renderSteps = (currentStep: number) => {
        switch (currentStep) {
            case 0:
                return <Step1 />
            case 1:
                return <Step2 />
            case 2:
                return <Step3 />
            case 3:
                return <Step4 />
            default:
                return 'Unknown Step'
        }
    }

    return (
        <div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
            {/*  */}
            <h4 className="text-xl font-bold">RSBSA Form</h4>
            {/*  */}
            <div className="w-full border-b border-gray-200 -mt-3"></div>
            {/*  */}
            <div className="w-full flex justify-around items-center">
                {/*  */}
                <div className="flex flex-col items-center gap-y-2">
                    <div className={`w-8 h-8 bg-[#89644e] rounded-full flex justify-center items-center`}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className={`w-4 h-4 text-white`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                    <p className={`text-xs font-light text-[#89644e]`}>Personal Information</p>
                </div>
                {/*  */}
                <div className="flex flex-col items-center gap-y-2">
                    <div className={`w-8 h-8 ${ rsbsaStep > 0 ? 'bg-[#89644e]' : 'bg-gray-200' } rounded-full flex justify-center items-center`}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className={`w-4 h-4 ${ rsbsaStep > 0 ? 'text-white' : 'text-gray-400' }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                    <p className={`text-xs font-light ${ rsbsaStep > 0 ? 'text-[#89644e]' : 'text-gray-700' }`}>Type of Livelihood</p>
                </div>
                {/*  */}
                <div className="flex flex-col items-center gap-y-2">
                    <div className={`w-8 h-8 ${ rsbsaStep > 1 ? 'bg-[#89644e]' : 'bg-gray-200' } rounded-full flex justify-center items-center`}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className={`w-4 h-4 ${ rsbsaStep > 1 ? 'text-white' : 'text-gray-400' }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                    <p className={`text-xs font-light ${ rsbsaStep > 1 ? 'text-[#89644e]' : 'text-gray-700' }`}>Livelihood Activities</p>
                </div>
                {/*  */}
                <div className="flex flex-col items-center gap-y-2">
                    <div className={`w-8 h-8 ${ rsbsaStep > 2 ? 'bg-[#89644e]' : 'bg-gray-200' } rounded-full flex justify-center items-center`}>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className={`w-4 h-4 ${ rsbsaStep > 2 ? 'text-white' : 'text-gray-400' }`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </div>
                    <p className={`text-xs font-light ${ rsbsaStep > 2 ? 'text-[#89644e]' : 'text-gray-700' }`}>Proof & Signature</p>
                </div>
                {/*  */}
            </div>
            {/*  */}
            <div className="mt-8 w-full flex justify-center">
                { renderSteps(rsbsaStep) }
            </div>
            {/*  */}
        </div>
    )
}

export default RSBSAView