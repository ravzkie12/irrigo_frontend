import React from 'react'
import AuthInputField from '../../components/AuthInputField'
import AuthButton from '../../components/AuthButton'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { onSubmitRegisterStep1 } from '../../redux/authSlice'
import { useForm } from 'react-hook-form'
import { fieldRules } from '../../components/authHelper'

const Step1 = () => {

    const { handleSubmit, control } = useForm()
    const dispatch = useAppDispatch()
    const { registerFirstName, registerLastName } = useAppSelector((state: any) => state.authState)

    const handleStep1Submit = (formData: any) => {
        dispatch(onSubmitRegisterStep1(formData))
    }

    return (
        <form 
            className="flex flex-col gap-y-8"
            autoComplete="off"
        >
            <div className="w-96 flex flex-col gap-y-1">
                    <h4 className="text-3xl font-bold tracking-wide text-[#89644e]">Step 1</h4>
                    <p className="tracking-wide">Your basic information</p>
                </div>
                <AuthInputField 
                    myControl={ control }
                    fieldType="text"
                    fieldName="registerFirstName"
                    fieldLabel="First Name"
                    fieldRules={ fieldRules.requiredStringRule }
                    defaultValue={ registerFirstName }
                />
                <AuthInputField 
                    myControl={ control }
                    fieldType="text"
                    fieldName="registerLastName"
                    fieldLabel="Last Name"
                    fieldRules={ fieldRules.requiredStringRule }
                    defaultValue={ registerLastName }
                />
                <AuthButton 
                    buttonText="Next"
                    onClickButton={ handleSubmit(handleStep1Submit) }
                />
        </form>
    )
}

export default Step1