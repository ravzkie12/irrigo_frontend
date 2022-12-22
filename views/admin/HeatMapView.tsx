import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUbidotsData } from "../../redux/dataSlice";
import HeatMapChat from "../../components/admin/HeatMapChat";

const HeatMapView = () => {
	const dispatch = useAppDispatch();
	const { heatOptions, heatSeries } = useAppSelector(
		(state) => state.dataState
	);

	useEffect(() => {
		dispatch(getUbidotsData());
	}, []);

	return (
		<div className="flex flex-col gap-y-5">
			<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg hover:cursor-pointer">
				<img
					src="/images/irrigation_site.png"
					className="w-full max-h-full pointer-events-none"
				/>
				<div className="flex gap-x-5">
					<div className="flex gap-x-1 items-center">
						<h4 className="text-base font-bold hover:cursor-default">
							Latitude:{" "}
						</h4>
						<p className="text-sm font-light hover:cursor-default">7.3209</p>
					</div>
					{/*  */}
					<div className="flex gap-x-1 items-center">
						<h4 className="text-base font-bold hover:cursor-default">
							Longitude:{" "}
						</h4>
						<p className="text-sm font-light hover:cursor-default">125.6736</p>
					</div>
				</div>
			</div>
			<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				{/*  */}
				<h4 className="text-xl font-bold">Heat Map</h4>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{/*  */}
				<div className="w-full h-96">
					<HeatMapChat
						heatOptions={heatOptions}
						heatSeries={heatSeries}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeatMapView;
