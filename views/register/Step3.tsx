import React, { useState } from 'react'
import AuthInputField from '../../components/AuthInputField'
import AuthButton from '../../components/AuthButton'
import SecondaryButton from '../../components/AuthSecondaryButton'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { onPrevStep, registerUser, onSuccessfulAuth } from '../../redux/authSlice'
import { useForm } from 'react-hook-form'
import { fieldRules } from '../../components/authHelper'
import { useRouter } from 'next/router'

interface Step3Params {
    onShowAlertEvent(): void;
}

const Step3 = ({ onShowAlertEvent }: Step3Params) => {

    const { handleSubmit, control, getValues } = useForm()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { registerPassword1, registerPassword2 } = useAppSelector((state: any) => state.authState)
    const [notMatch, setNotMatch] = useState(false)

    const handleStep3Submit = (formData: any) => {
        if (getValues("registerPassword1") !== getValues("registerPassword2")) {
            setNotMatch(true)
            return
        }
        dispatch(registerUser(formData.registerPassword1)).then((response) => {
            dispatch(onSuccessfulAuth(response.payload.status))
            onShowAlertEvent()
            setTimeout(() => {
                router.push('/')
            }, 2000)
        })
    }

    return (
        <form 
            className="flex flex-col gap-y-8"
            autoComplete="off"
        >
            <div className="w-96 flex flex-col gap-y-1">
                    <h4 className="text-3xl font-bold tracking-wide text-[#89644e]">Step 3</h4>
                    <p className="tracking-wide">Confirm your account password</p>
                </div>
                <AuthInputField 
                    myControl={ control }
                    fieldType="password"
                    fieldName="registerPassword1"
                    fieldLabel="Password"
                    fieldRules={ fieldRules.requiredPasswordRule }
                    defaultValue={ registerPassword1 }
                />
                <div className="flex flex-col gap-y-1">
                    <AuthInputField 
                        myControl={ control }
                        fieldType="password"
                        fieldName="registerPassword2"
                        fieldLabel="Confirm Password"
                        fieldRules={ fieldRules.requiredRule }
                        defaultValue={ registerPassword2 }
                    />
                    { notMatch && <p className="text-xs text-rose-500">Passwords does not match</p> }
                </div>

                <AuthButton 
                    buttonText="Sign Up"
                    onClickButton={ handleSubmit(handleStep3Submit) }
                />
                <SecondaryButton 
                    buttonText="Previous" 
                    onClickButton={ () => dispatch(onPrevStep()) }
                />
        </form>
    )
}

export default Step3