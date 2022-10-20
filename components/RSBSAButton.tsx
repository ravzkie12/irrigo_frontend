interface RSBSAButtonProps {
    buttonText: string;
    onClickButton(): void;
}

const RSBSAButton = ({ buttonText, onClickButton }: RSBSAButtonProps) => {
    return (
        <button 
            type="button" 
            className={`w-64 bg-[#89644e] font-bold tracking-wider text-base text-white py-2 rounded-md`}
            onClick={ onClickButton }
        >{ buttonText }</button>
    )
}

export default RSBSAButton