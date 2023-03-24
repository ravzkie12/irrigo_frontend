import { useState, useEffect } from "react";
import LivelihoodOption from "./LivelihoodOption";
import NextButton from "../../../components/RSBSAButton";
import PreviousButton from "../../../components/RSBSASecondaryButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	onNextStep,
	onPrevStep,
	onSelectOption,
} from "../../../redux/dataSlice";

const ForFarmer = () => {
	const dispatch = useAppDispatch();
	const { userProfile } = useAppSelector((state) => state.authState);
	const [isSelected, setIsSelected] = useState("");
	const [hasError, setHasError] = useState(false);

	const handleOptionClick = (option: { name: string; value: string }) => {
		setHasError(false);
		setIsSelected(option.value);
		dispatch(onSelectOption(option));
	};

	const onProceedNext = () => {
		if (!isSelected.length) {
			setHasError(true);
			return;
		}
		dispatch(onNextStep());
	};

	useEffect(() => {
		userProfile.livelihood_product.length
			? setIsSelected(userProfile.livelihood_product)
			: setIsSelected("");
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-noto text-gray-700">
			<h4 className="self-center w-96 text-base font-bold">For Farmers</h4>
			<div className="grid grid-cols-3 gap-x-8">
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Crops"
					onClickOption={() =>
						handleOptionClick({ name: "livelihoodProduct", value: "Crops" })
					}
				/>
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Livestock"
					onClickOption={() =>
						handleOptionClick({ name: "livelihoodProduct", value: "Livestock" })
					}
				/>
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Poultry"
					onClickOption={() =>
						handleOptionClick({ name: "livelihoodProduct", value: "Poultry" })
					}
				/>
			</div>
			{hasError && (
				<div className="self-center w-96">
					<p className="text-xs text-rose-500">Please select an option</p>
				</div>
			)}
			<div className="mt-10 mb-5 w-full flex justify-between">
				<PreviousButton
					buttonText="Previous"
					onClickButton={() => dispatch(onPrevStep())}
				/>
				<NextButton
					buttonText="Next"
					onClickButton={onProceedNext}
				/>
			</div>
		</div>
	);
};

export default ForFarmer;
