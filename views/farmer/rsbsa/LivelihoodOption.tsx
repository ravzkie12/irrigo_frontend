import React from 'react'

interface LivelihoodOptionParams {
    selectedOption: string;
    livelihoodType: string;
    onClickOption(): void;
}

const LivelihoodOption = ({ selectedOption, livelihoodType, onClickOption }: LivelihoodOptionParams) => {
    return (
        <div 
            className={`w-full border ${ selectedOption === livelihoodType ? 'border-[#89644e]' : 'border-gray-200' } p-8 flex items-center gap-x-5 rounded-lg hover:cursor-pointer`}
            onClick={ onClickOption }
        >
            {/*  */}
            <div className={`w-8 h-8 border ${ selectedOption === livelihoodType ? 'border-[#89644e]' : 'border-gray-300' } rounded-full p-1 flex justify-center items-center`}>
                <div className={`w-full h-full ${ selectedOption === livelihoodType ? 'bg-[#89644e]' : 'bg-gray-300' } rounded-full`}></div>
            </div>
            {/*  */}
            <h4 className={`font-medium text-sm ${ selectedOption === livelihoodType ? 'text-[#89644e]' : 'text-gray-700' }`}>{ livelihoodType }</h4>
            {/*  */}
        </div>
    )
}

export default LivelihoodOption