import React, { useState, useEffect } from "react";
import LivelihoodOption from "./LivelihoodOption";
import NextButton from "../../../components/RSBSAButton";
import PreviousButton from "../../../components/RSBSASecondaryButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
	onNextStep,
	onPrevStep,
	onSelectOption,
} from "../../../redux/dataSlice";

const ForFisher = () => {
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
		userProfile.fishing_activity.length
			? setIsSelected(userProfile.fishing_activity)
			: setIsSelected("");
	}, []);

	return (
		<div className="flex flex-col gap-y-5 font-noto text-gray-700">
			<h4 className="text-base font-bold">For Fisherfolks</h4>
			<div className="grid grid-cols-2 gap-16">
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Fish Capture"
					onClickOption={() =>
						handleOptionClick({
							name: "fishingActivity",
							value: "Fish Capture",
						})
					}
				/>
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Aquaculture"
					onClickOption={() =>
						handleOptionClick({ name: "fishingActivity", value: "Aquaculture" })
					}
				/>
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Gleaning"
					onClickOption={() =>
						handleOptionClick({ name: "fishingActivity", value: "Gleaning" })
					}
				/>
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Fish Processing"
					onClickOption={() =>
						handleOptionClick({
							name: "fishingActivity",
							value: "Fish Processing",
						})
					}
				/>
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Fish Vending"
					onClickOption={() =>
						handleOptionClick({
							name: "fishingActivity",
							value: "Fish Vending",
						})
					}
				/>
			</div>
			{hasError && (
				<p className="text-xs text-rose-500">Please select an option</p>
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

export default ForFisher;
