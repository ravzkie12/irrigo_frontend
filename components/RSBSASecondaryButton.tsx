interface RSBSASecondaryButtonProps {
    buttonText: string;
    onClickButton(): void;
}

const RSBSASecondaryButton = ({ buttonText, onClickButton }: RSBSASecondaryButtonProps) => {
    return (
        <button 
            type="button" 
            className={`w-64 bg-gray-200 hover:bg-gray-100 font-bold tracking-wider text-base text-[#89644e] py-2 rounded-md`}
            onClick={ onClickButton }
        >{ buttonText }</button>
    )
}

export default RSBSASecondaryButton