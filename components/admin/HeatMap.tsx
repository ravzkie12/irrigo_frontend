import { useState, useEffect } from "react";
import { getUbidotsCoordinates, getUbidotsData } from "../../redux/dataSlice";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, Circle } from "react-leaflet";
import L from "leaflet";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ExportToCsv } from "export-to-csv";
import moment from "moment";

// BLUE/RIPENING
// Fill - #008ffb80
// Stroke - #008ffb

// GREEN/REPRODUCTIVE
// Fill - #00ff9680
// Stroke - #00ff96

// YELLOW/VEGETATIVE:
// Fill - #feb01980
// Stroke - #feb019

const HeatMap = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, heatSeries } = useAppSelector(
		(state) => state.dataState
	);
	const [coordinates, setCoordinates] = useState<any>([7.3137, 125.6711]);
	// 7.3137, 125.6711
	const [circleData, setCircleData] = useState<any>([]);

	const getCircleColor = (value: number): { fill: string; stroke: string } => {
		let color = {
			fill: "",
			stroke: "",
		};
		if (value <= 55) {
			color.fill = "#008ffb80";
			color.stroke = "#008ffb";
		} else if (value <= 75) {
			color.fill = "#00ff9680";
			color.stroke = "#00ff9680";
		} else if (value <= 100) {
			color.fill = "#feb01980";
			color.stroke = "#feb019";
		}
		return color;
	};

	useEffect(() => {
		dispatch(getUbidotsData()).then((res: any) => {
			const { formattedSeries, dateTimeSeries } = res.payload;
			const series = [
				...formattedSeries.ripening,
				...formattedSeries.reproductive,
				...formattedSeries.vegetative,
			];
			const seriesWithDateTime = series.map((data: any, index) => {
				return {
					value: data,
					date: moment(dateTimeSeries[index]).format("LL"),
					time: moment(dateTimeSeries[index]).format("hh:mm A"),
				};
			});
			const data = seriesWithDateTime.map((data: any) => {
				return {
					lat: 0.3 + Math.random() * 0.09,
					long: 0.6 + Math.random() * 0.09,
					value: data.value,
					date: data.date,
					time: data.time,
				};
			});
			setCircleData(data);
		});
		dispatch(getUbidotsCoordinates()).then((res: any) => {
			let coords = res.payload[0].properties._location_fixed;
			console.log("Response coords: ", coords);
			setCoordinates(Object.values(coords));
			console.log("New coords: ", coordinates);
		});
	}, []);

	const onExportData = () => {
		const csvHeatData = heatSeries.map((data: any) => {
			return {
				type: Object.keys(data)[0],
				value: Object.values(data)[0],
			};
		});
		const options = {
			useKeysAsHeaders: true,
			filename: "Heat Map",
		};
		const csvExporter = new ExportToCsv(options);
		csvHeatData.length > 0 ? csvExporter.generateCsv(csvHeatData) : null;
	};

	return (
		<div className="w-full h-screen bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg overflow-hidden">
			{/*  */}
			<div className="w-full flex justify-between">
				<h4 className="text-xl font-bold">Heat Map</h4>
				<button
					className="bg-transparent text-[#89644e]"
					title="Export Excel"
					onClick={onExportData}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
				</button>
			</div>
			{/*  */}
			<div className="w-full border-b border-gray-200 -mt-3"></div>
			{/*  */}
			{!dataLoading && (
				<MapContainer
					center={coordinates}
					zoom={12}
					scrollWheelZoom={false}
					style={{
						height: "100%",
						width: "100vw",
					}}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker
						position={coordinates}
						icon={L.divIcon({
							iconSize: [30, 30],
							iconAnchor: [30 / 2, 30 + 9],
							html: `
				        <svg
				            xmlns="http://www.w3.org/2000/svg"
				            preserveAspectRatio="xMidYMid meet"
				            viewBox="0 0 24 24"
				        >
				            <path fill="#89644e"
				                d="M12.275 19q.3-.025.513-.237q.212-.213.212-.513q0-.35-.225-.562q-.225-.213-.575-.188q-1.025.075-2.175-.562q-1.15-.638-1.45-2.313q-.05-.275-.263-.45Q8.1 14 7.825 14q-.35 0-.575.262q-.225.263-.15.613q.425 2.275 2 3.25q1.575.975 3.175.875ZM12 22q-3.425 0-5.712-2.35Q4 17.3 4 13.8q0-2.5 1.988-5.437Q7.975 5.425 12 2q4.025 3.425 6.013 6.363Q20 11.3 20 13.8q0 3.5-2.288 5.85Q15.425 22 12 22Z"
				            />
				        </svg>
				        `,
						})}
					>
						<Popup>This is a popup!</Popup>
					</Marker>
					{!dataLoading &&
						circleData.length > 0 &&
						circleData.map((data: any, index: number) => {
							const color = getCircleColor(data.value);
							// const lat = 7 + data.lat;
							// const long = 125 + data.long;
							return (
								<Circle
									key={index}
									center={[7.3137, 125.6711]}
									radius={color.stroke === "#feb019" ? 100 : 60}
									pathOptions={{ color: `${color.stroke}`, weight: 0.3 }}
									fillColor={`${color.stroke}`}
								>
									<Popup>
										<h4 className="font-light text-sm">
											Date: <span className="font-bold">{data.date}</span>
										</h4>{" "}
										<h4 className="font-light text-sm">
											Time: <span className="font-bold">{data.time}</span>
										</h4>
										<h4 className="font-light text-sm">
											Value: <span className="font-bold">{data.value}</span>
										</h4>
									</Popup>
								</Circle>
							);
						})}
				</MapContainer>
			)}
			<div className="w-full flex justify-center gap-x-5">
				<div className="flex gap-x-1">
					<div className="bg-[#008ffb80] border-[0.5px] border-[#008ffb] rounded-full w-5 h-5"></div>
					<p className="text-xs font-light text-[#008ffb]">ripening</p>
				</div>
				{/*  */}
				<div className="flex gap-x-1">
					<div className="bg-[#00ff9680] border-[0.5px] border-[#00ff96] rounded-full w-5 h-5"></div>
					<p className="text-xs font-light text-[#00ff96]">reproductive</p>
				</div>
				{/*  */}
				<div className="flex gap-x-1">
					<div className="bg-[#feb01980] border-[0.5px] border-[#feb019] rounded-full w-5 h-5"></div>
					<p className="text-xs font-light text-[#feb019]">vegetative</p>
				</div>
				{/*  */}
			</div>
		</div>
	);
};

export default HeatMap;
