import { Controller } from 'react-hook-form'

interface AuthInputFieldProps {
    myControl: any;
    fieldType: string;
    fieldName: string;
    fieldLabel: string;
    fieldRules: any;
    defaultValue: string;
}

const AuthInputField = ({ myControl, fieldType, fieldName, fieldLabel, fieldRules, defaultValue }: AuthInputFieldProps) => {
    return (
        <Controller 
            control={ myControl }
            name={ fieldName }
            rules={ fieldRules }
            defaultValue={ defaultValue ?? "" }
            render={({
                field: { onChange },
                fieldState: { error }
            }) => (
                <div className="flex flex-col gap-y-1">
                    <label className="text-sm font-medium tracking-wider">{ fieldLabel }</label>
                    <input 
                        type={ fieldType }
                        id={ fieldName }
                        className={`w-96 bg-gray-100 border-2 border-transparent focus:outline-none focus:border-[#89644e] px-2 py-1 rounded-md`}
                        onChange={ onChange }
                        defaultValue={ defaultValue ?? "" }
                    />
                    { error && <p className="text-xs text-rose-500">{ error.type !== 'validate' ? error.message : 'Email already used in another account' }</p> }
                </div>
            )}
        />
    )
}

export default AuthInputField