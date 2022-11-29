import React, { useState, useEffect } from "react";
import NextButton from "../../../components/RSBSAButton";
import PreviousButton from "../../../components/RSBSASecondaryButton";
import {
	onNextStep,
	onPrevStep,
	onSelectLivelihood,
} from "../../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import LivelihoodOption from "./LivelihoodOption";

const Step2 = () => {
	const dispatch = useAppDispatch();
	const { userProfile } = useAppSelector((state) => state.authState);
	const { selectedLivelihood } = useAppSelector((state) => state.dataState);
	const [isSelected, setIsSelected] = useState("");

	const onClickLivelihoodOption = (option: string) => {
		setIsSelected(option);
		dispatch(onSelectLivelihood(option));
	};

	useEffect(() => {
		userProfile.main_livelihood.length
			? setIsSelected(userProfile.main_livelihood)
			: setIsSelected(selectedLivelihood);
	}, []);

	return (
		<div className="w-[700px] flex flex-col gap-y-5 font-noto text-gray-700">
			{/*  */}
			<h4 className="text-base font-bold">Main Type of Livelihood:</h4>
			{/*  */}
			<div className="grid grid-cols-2 gap-16">
				{/*  */}
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Farmer"
					onClickOption={() => onClickLivelihoodOption("Farmer")}
				/>
				{/*  */}
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Farmworker/Laborer"
					onClickOption={() => onClickLivelihoodOption("Farmworker/Laborer")}
				/>
				{/*  */}
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Fisherfolk"
					onClickOption={() => onClickLivelihoodOption("Fisherfolk")}
				/>
				{/*  */}
				<LivelihoodOption
					selectedOption={isSelected}
					livelihoodType="Agri Youth"
					onClickOption={() => onClickLivelihoodOption("Agri Youth")}
				/>
				{/*  */}
			</div>
			{/*  */}
			<div className="mt-10 mb-5 w-full flex justify-between">
				<PreviousButton
					buttonText="Previous"
					onClickButton={() => dispatch(onPrevStep())}
				/>
				<NextButton
					buttonText="Next"
					onClickButton={() => dispatch(onNextStep())}
				/>
			</div>
		</div>
	);
};

export default Step2;
