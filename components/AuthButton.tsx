interface AuthButtonProps {
    buttonText: string;
    onClickButton(): void;
}

const AuthButton = ({ buttonText, onClickButton }: AuthButtonProps) => {
    return (
        <button 
            type="button" 
            className={`w-96 bg-[#89644e] font-bold tracking-wider text-base text-white py-2 rounded-md`}
            onClick={ onClickButton }
        >{ buttonText }</button>
    )
}

export default AuthButton