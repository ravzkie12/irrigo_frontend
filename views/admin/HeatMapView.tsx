import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUbidotsData } from "../../redux/dataSlice";
import HeatMapChart from "../../components/admin/HeatMapChart";
import HeatMap from "../../components/admin/HeatMap";

const HeatMapView = () => {
	const dispatch = useAppDispatch();
	const { heatOptions, heatSeries } = useAppSelector(
		(state) => state.dataState
	);

	useEffect(() => {
		dispatch(getUbidotsData());
	}, []);

	return (
		<div className="h-screen flex flex-col gap-y-5">
			<HeatMap />
			<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<h4 className="text-xl font-bold">Heat Map</h4>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{/*  */}
				<div className="w-full h-96">
					<HeatMapChart
						heatOptions={heatOptions}
						heatSeries={heatSeries}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeatMapView;
