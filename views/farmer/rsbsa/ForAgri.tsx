import React, { useState, useEffect } from 'react'
import LivelihoodOption from './LivelihoodOption'
import NextButton from '../../../components/RSBSAButton'
import PreviousButton from '../../../components/RSBSASecondaryButton'
import { useAppDispatch } from '../../../redux/hooks'
import { onNextStep, onPrevStep, onSelectOption } from '../../../redux/dataSlice'

const ForAgri = () => {

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
            <h4 className="text-base font-bold">For Agri Youths</h4>
            <div className="grid grid-cols-2 gap-16">
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Part of farming household"
                    onClickOption={ () => handleOptionClick({ name : "involvementType", value : "Part of farming household" }) }
                />
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Formal agri-fishery courses"
                    onClickOption={ () => handleOptionClick({ name : "involvementType", value : "Formal agri-fishery courses" }) }
                />
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Non-formal agri-fishery courses"
                    onClickOption={ () => handleOptionClick({ name : "involvementType", value : "Non-formal agri-fishery courses" }) }
                />
                <LivelihoodOption 
                    selectedOption={ isSelected }
                    livelihoodType="Agricultural activity participant"
                    onClickOption={ () => handleOptionClick({ name : "involvementType", value : "Agricultural activity participant" }) }
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

export default ForAgri