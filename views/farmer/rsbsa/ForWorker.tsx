import React, { useState, useEffect } from 'react'
import LivelihoodOption from './LivelihoodOption'
import NextButton from '../../../components/RSBSAButton'
import PreviousButton from '../../../components/RSBSASecondaryButton'
import { useAppDispatch } from '../../../redux/hooks'
import { onNextStep, onPrevStep, onSelectOption } from '../../../redux/dataSlice'

const ForWorker = () => {

    const dispatch = useAppDispatch()
    const [isSelected, setIsSelected] = useState("")
    const [hasError, setHasError] = useState(false)

    const handleOptionClick = (option: { name: string, value: string }) => {
        setHasError(false)
        setIsSelected(option.value)
        dispatch(onSelectOption(option))
    }

    const onProceedNext = () => {
        if (!isSelected.length) {
            setHasError(true)
            return
        }
        dispatch(onNextStep())
    }

    return (
        <div className="flex flex-col gap-y-5 font-noto text-gray-700">
            <h4 className="text-base font-bold">For Farmworkers/Laborers</h4>
            <div className="grid grid-cols-2 gap-16">
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Land Preparation"
                    onClickOption={ () => handleOptionClick({ name : "workerActivity", value : "Land Preparation" }) }
                />
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Planting/Transplanting"
                    onClickOption={ () => handleOptionClick({ name : "workerActivity", value : "Planting/Transplanting" }) }
                />
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Cultivation"
                    onClickOption={ () => handleOptionClick({ name : "workerActivity", value : "Cultivation" }) }
                />
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Harvesting"
                    onClickOption={ () => handleOptionClick({ name : "workerActivity", value : "Harvesting" }) }
                />
            </div>
            { hasError && <p className="text-xs text-rose-500">Please select an option</p> }
            <div className="mt-10 mb-5 w-full flex justify-between">
                <PreviousButton 
                    buttonText="Previous"
                    onClickButton={ () => dispatch(onPrevStep()) }
                />
                <NextButton 
                    buttonText="Next"
                    onClickButton={ onProceedNext }
                />
            </div>
        </div>
    )
}

export default ForWorker