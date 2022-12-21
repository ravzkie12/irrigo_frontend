import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUbidotsData } from "../../redux/dataSlice";
import { BeatLoader } from "react-spinners";

const chartOptions = {
	chart: {
		id: "customAreaChart",
	},
	xaxis: {
		categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
	},
};

// const chartSeries = [
//     { name: "Vegetative Stage", data: [30, 40, 45, 50] },
//     { name: "Reproductive Stage", data: [35, 25, 30, 55] },
//     { name: "Ripening Stage", data: [40, 45, 20, 60] },
// ]

const HeatMapView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, heatOptions, heatSeries } = useAppSelector(
		(state) => state.dataState
	);

	useEffect(() => {
		dispatch(getUbidotsData());
	}, []);

	return (
		<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
			{/*  */}
			<h4 className="text-xl font-bold">Heat Map</h4>
			{/*  */}
			<div className="w-full border-b border-gray-200 -mt-3"></div>
			{/*  */}
			<div className="w-full h-96">
				<Chart
					options={heatOptions}
					series={heatSeries}
					width="100%"
					height="100%"
					type="heatmap"
					// stacked={true}
				/>
			</div>
		</div>
	);
};

export default HeatMapView;
