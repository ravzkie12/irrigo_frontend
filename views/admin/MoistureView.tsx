import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUbidotsData } from "../../redux/dataSlice";
import MoistureChart from "../../components/admin/MoistureChart";

// BLUE/RIPENING
// Fill - #008ffb80
// Stroke - #008ffb

// GREEN/REPRODUCTIVE
// Fill - #00ff9680
// Stroke - #00ff96

// YELLOW/VEGETATIVE:
// Fill - #feb01980
// Stroke - #feb019

const MoistureView = () => {
	const dispatch = useAppDispatch();
	const { moistureSeries } = useAppSelector((state) => state.dataState);

	const [firstLoad, setFirstLoad] = useState(false);

	useEffect(() => {
		dispatch(getUbidotsData()).then(() => setFirstLoad(true));
	}, []);

	return (
		<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
			{/*  */}
			<h4 className="text-xl font-bold">Rice Stage</h4>
			{/*  */}
			<div className="w-full border-b border-gray-200 -mt-3"></div>
			{/*  */}
			<div className="w-full h-96">
				<MoistureChart moistureSeries={moistureSeries} />
			</div>
		</div>
	);
};

export default MoistureView;
