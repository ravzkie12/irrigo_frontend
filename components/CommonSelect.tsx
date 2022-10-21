import { Controller } from 'react-hook-form'

interface CommonSelectFieldProps {
    myControl: any;
    myOptions: any;
    fieldName: string;
    fieldLabel: string;
    fieldRules: any;
    defaultValue?: string;
}

const CommonSelectField = ({ myControl, myOptions, fieldName, fieldLabel, fieldRules, defaultValue }: CommonSelectFieldProps) => {
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
                    <select 
                        id={ fieldName }
                        className={`w-full bg-gray-100 border-2 border-transparent focus:outline-none focus:border-[#89644e] px-2 py-1 rounded-md appearance-none`}
                        onChange={ onChange }
                        defaultValue=""
                    >
                        <option disabled value=""></option>
                        { myOptions.map((option: any) => {
                            return (
                                <option value={ option.value }>{ option.label }</option>
                            )
                        })}
                    </select>
                    { error && <p className="text-xs text-rose-500">{ error.type !== 'validate' ? error.message : 'Email already used in another account' }</p> }
                </div>
            )}
        />
    )
}

export default CommonSelectField