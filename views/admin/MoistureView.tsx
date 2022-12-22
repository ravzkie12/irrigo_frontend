import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUbidotsData } from "../../redux/dataSlice";
import MoistureChart from "../../components/admin/MoistureChart";

const MoistureView = () => {
	const dispatch = useAppDispatch();
	const { moistureOptions, moistureSeries } = useAppSelector(
		(state) => state.dataState
	);

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
				<MoistureChart
					moistureOptions={moistureOptions}
					moistureSeries={moistureSeries}
					isFistLoad={firstLoad}
				/>
			</div>
		</div>
	);
};

export default MoistureView;
