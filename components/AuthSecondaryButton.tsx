interface AuthSecondaryButtonProps {
    buttonText: string;
    onClickButton(): void;
}

const AuthSecondaryButton = ({ buttonText, onClickButton }: AuthSecondaryButtonProps) => {
    return (
        <button 
            type="button" 
            className={`-mt-3 w-96 bg-gray-200 hover:bg-gray-100 font-bold tracking-wider text-base text-[#89644e] py-2 rounded-md`}
            onClick={ onClickButton }
        >{ buttonText }</button>
    )
}

export default AuthSecondaryButton