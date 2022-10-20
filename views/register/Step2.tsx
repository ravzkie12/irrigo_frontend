import React from 'react'
import AuthInputField from '../../components/AuthInputField'
import AuthButton from '../../components/AuthButton'
import SecondaryButton from '../../components/AuthSecondaryButton'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { onSubmitRegisterStep2, onPrevStep } from '../../redux/authSlice'
import { useForm } from 'react-hook-form'
import { fieldRules } from '../../components/authHelper'

const Step2 = () => {

    const { handleSubmit, control } = useForm()
    const dispatch = useAppDispatch()
    const { registerMobile, registerEmail } = useAppSelector((state: any) => state.authState)

    const handleStep2Submit = (formData: any) => {
        dispatch(onSubmitRegisterStep2(formData))
    }

    return (
        <form 
            className="flex flex-col gap-y-8"
            autoComplete="off"
        >
            <div className="w-96 flex flex-col gap-y-1">
                    <h4 className="text-3xl font-bold tracking-wide text-[#89644e]">Step 2</h4>
                    <p className="tracking-wide">Your contact information</p>
                </div>
                <AuthInputField 
                    myControl={ control }
                    fieldType="text"
                    fieldName="registerMobile"
                    fieldLabel="Mobile Number"
                    fieldRules={ fieldRules.requiredMobileNumberRule }
                    defaultValue={ registerMobile }
                />
                <AuthInputField 
                    myControl={ control }
                    fieldType="email"
                    fieldName="registerEmail"
                    fieldLabel="Email"
                    fieldRules={ fieldRules.requiredUniqueEmailRule }
                    defaultValue={ registerEmail }
                />
                <AuthButton 
                    buttonText="Next"
                    onClickButton={ handleSubmit(handleStep2Submit) }
                />
                <SecondaryButton 
                    buttonText="Previous" 
                    onClickButton={ () => dispatch(onPrevStep()) }
                />
        </form>
    )
}

export default Step2