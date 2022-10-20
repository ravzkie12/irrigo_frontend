interface MyInputFieldProps {
    fieldType: string;
    fieldName: string;
    fieldLabel: string;
    fieldSize: string;
} 

const MyInputField = ({ fieldType, fieldName, fieldLabel, fieldSize }: MyInputFieldProps) => {
    return (
        <div className="flex flex-col gap-y-1">
            <label htmlFor={ fieldName } className="text-sm font-medium tracking-wider">{ fieldLabel }</label>
            <input 
                type={ fieldType }
                name={ fieldName }
                id={ fieldName }
                className={`w-${fieldSize} bg-gray-100 border-2 border-transparent focus:outline-none focus:border-purple-400 px-2 py-1 rounded-md`}
            />
            {/* <p className="text-rose-400 text-xs"></p> */}
        </div>
    )
}

export default MyInputField