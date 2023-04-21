import React, { useEffect, useState, useMemo } from "react";
import DataLogsTable from "./DataLogsTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getDataLogs, getUbidotsData } from "../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import Pagination from "../../components/Pagination";
import moment from "moment";
import _ from "lodash";
import { DateRange } from "react-date-range";
import { ExportToCsv } from "export-to-csv";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DataLogsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, dataLogs, heatSeries } = useAppSelector(
		(state) => state.dataState
	);
	const [currentPage, setCurrentPage] = useState(1);
	const [logsPerPage, setLogsPerPage] = useState(10);
	const [filteredLogs, setFilteredLogs] = useState<any>(dataLogs);

	const [selection, setSelection] = useState([
		{
			startDate:
				filteredLogs.length > 0
					? new Date(filteredLogs[filteredLogs.length - 1].timestamp)
					: new Date(),
			endDate:
				filteredLogs.length > 0
					? new Date(filteredLogs[0].timestamp)
					: new Date(),
			key: "selection",
		},
	]);
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [hasFilter, setHasFilter] = useState<boolean>(false);

	const [coordinates, setCoordinates] = useState<any>([7.341, 125.6369]);

	useEffect(() => {
		dispatch(getUbidotsData());
		dispatch(getDataLogs()).then((res) => {
			const uniqueData = _.uniqBy(
				res.payload,
				(obj: any) => `${obj.value}${obj.date}`
			);
			setFilteredLogs(uniqueData);
		});
	}, []);

	const ripeningCircleData = useMemo(() => {
		const data = filteredLogs.find((log: any) => log.value <= 55);
		return data ? data : {};
	}, [filteredLogs]);

	const reproductiveCircleData = useMemo(() => {
		const data = filteredLogs.find(
			(log: any) => log.value > 55 && log.value <= 75
		);
		return data ? data : {};
	}, [filteredLogs]);

	const vegetativeCircleData = useMemo(() => {
		const data = filteredLogs.find(
			(log: any) => log.value > 75 && log.value <= 100
		);
		return data ? data : {};
	}, [filteredLogs]);

	const onDateFilter = (item: any) => {
		const { selection } = item;
		console.log("Selection: ", selection);
		setSelection([selection]);
		if (
			moment(selection.startDate).format("MM-DD-YYYY") !==
			moment(selection.endDate).format("MM-DD-YYYY")
		) {
			setShowDatePicker(false);
		} else if (selection.startDate === "" && selection.endDate === "") {
			setShowDatePicker(false);
		}
		const uniqueLogs = _.uniqBy(
			dataLogs,
			(obj: any) => `${obj.value}${obj.date}`
		);
		const filteredValues: any = _.filter(uniqueLogs, (data: any) => {
			return (
				_.gte(
					moment(data.timestamp).format("MM-DD-YYYY"),
					moment(selection.startDate).format("MM-DD-YYYY")
				) &&
				_.lte(
					moment(data.timestamp).format("MM-DD-YYYY"),
					moment(selection.endDate).format("MM-DD-YYYY")
				)
			);
		});
		console.log("Filtered values: ", filteredValues);
		// const uniqueData = _.uniqBy(
		// 	filteredValues,
		// 	(obj: any) => `${obj.value}${obj.date}`
		// );
		setFilteredLogs(filteredValues);
		console.log("Filtered logs: ", filteredLogs);
		setHasFilter(true);
	};

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

	const lastLogIndex = currentPage * logsPerPage;
	const firstLogIndex = lastLogIndex - logsPerPage;

	const currentLogs = useMemo(() => {
		const uniqueData = _.uniqBy(
			filteredLogs,
			(obj: any) => `${obj.value}${obj.date}`
		);
		return uniqueData.slice(firstLogIndex, lastLogIndex);
	}, [dataLogs, onDateFilter]);

	return (
		<div className="flex flex-col gap-y-5">
			<div className="w-full min-h-[24rem] bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-bold">Data Logs</h4>
					<div className="relative">
						<button
							className="bg-transparent text-[#89644e]"
							onClick={() => setShowDatePicker(!showDatePicker)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="w-7 h-7"
							>
								<path
									fill="#89644e"
									d="M10 18v-2h4v2h-4Zm-4-5v-2h12v2H6ZM3 8V6h18v2H3Z"
								/>
							</svg>
						</button>
						{showDatePicker && (
							<DateRange
								// editableDateInputs={true}
								onChange={(item: any) => onDateFilter(item)}
								moveRangeOnFirstSelection={false}
								ranges={selection}
								className="absolute -left-72 top-5 mt-2"
								rangeColors={["#89644e"]}
							/>
						)}
					</div>
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{dataLoading && (
					<div className="w-full flex justify-center items-center">
						<MoonLoader
							loading={dataLoading}
							color="#89644e"
							speedMultiplier={1}
							size={70}
						/>
					</div>
				)}
				{!dataLoading && <DataLogsTable dataLogsList={currentLogs} />}
				<Pagination
					totalLogs={filteredLogs.length}
					logsPerPage={logsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
			{/*  */}
			<div className="w-full h-screen bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg overflow-hidden">
				{/*  */}
				<div className="w-full flex justify-between">
					<h4 className="text-xl font-bold">Heat Map</h4>
					<div className="flex gap-x-5">
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
				</div>
				{/*  */}
				<div className="w-full border-b border-gray-200 -mt-3"></div>
				{/*  */}
				{!dataLoading && (
					<MapContainer
						center={coordinates}
						zoom={18}
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
						{/* coordinates = { lat: 7.3137, long: 125.6711 };
						} else if (value <= 75) {
							coordinates = { lat: 7.3135, long: 125.6709 };
						} else if (value <= 100) {
							coordinates = { lat: 7.3132, long: 125.6705 }; */}
						{!dataLoading && (
							<>
								{ripeningCircleData.value ? (
									<Circle
										center={[7.341, 125.6369]}
										radius={5}
										pathOptions={{ color: "#008ffb", weight: 20 }}
										fillColor="#008ffb"
									>
										<Popup>
											<h4 className="font-light text-sm">
												Date:{" "}
												<span className="font-bold">
													{moment(ripeningCircleData.timestamp).format("LL")}
												</span>
											</h4>{" "}
											<h4 className="font-light text-sm">
												Time:{" "}
												<span className="font-bold">
													{moment(ripeningCircleData.timestamp).format(
														"hh:mm A"
													)}
												</span>
											</h4>
											<h4 className="font-light text-sm">
												Value:{" "}
												<span className="font-bold">
													{ripeningCircleData.value}
												</span>
											</h4>
										</Popup>
									</Circle>
								) : null}
								{reproductiveCircleData.value ? (
									<Circle
										center={[7.3408, 125.6367]}
										radius={5}
										pathOptions={{ color: "#00ff96", weight: 20 }}
										fillColor="#00ff96"
									>
										<Popup>
											<h4 className="font-light text-sm">
												Date:{" "}
												<span className="font-bold">
													{moment(reproductiveCircleData.timestamp).format(
														"LL"
													)}
												</span>
											</h4>{" "}
											<h4 className="font-light text-sm">
												Time:{" "}
												<span className="font-bold">
													{moment(reproductiveCircleData.timestamp).format(
														"hh:mm A"
													)}
												</span>
											</h4>
											<h4 className="font-light text-sm">
												Value:{" "}
												<span className="font-bold">
													{reproductiveCircleData.value}
												</span>
											</h4>
										</Popup>
									</Circle>
								) : null}
								{vegetativeCircleData.value ? (
									<Circle
										center={[7.3406, 125.6365]}
										radius={5}
										pathOptions={{ color: "#feb019", weight: 20 }}
										fillColor="#feb019"
									>
										<Popup>
											<h4 className="font-light text-sm">
												Date:{" "}
												<span className="font-bold">
													{moment(vegetativeCircleData.timestamp).format("LL")}
												</span>
											</h4>{" "}
											<h4 className="font-light text-sm">
												Time:{" "}
												<span className="font-bold">
													{moment(vegetativeCircleData.timestamp).format(
														"hh:mm A"
													)}
												</span>
											</h4>
											<h4 className="font-light text-sm">
												Value:{" "}
												<span className="font-bold">
													{vegetativeCircleData.value}
												</span>
											</h4>
										</Popup>
									</Circle>
								) : null}
							</>
						)}
					</MapContainer>
				)}
				<div className="w-full flex justify-center gap-x-5">
					<div className="flex gap-x-1">
						<div className="bg-[#008ffb] rounded-full w-5 h-5"></div>
						<p className="text-xs font-light text-[#008ffb]">ripening</p>
					</div>
					{/*  */}
					<div className="flex gap-x-1">
						<div className="bg-[#00ff96] rounded-full w-5 h-5"></div>
						<p className="text-xs font-light text-[#00ff96]">reproductive</p>
					</div>
					{/*  */}
					<div className="flex gap-x-1">
						<div className="bg-[#feb019] rounded-full w-5 h-5"></div>
						<p className="text-xs font-light text-[#feb019]">vegetative</p>
					</div>
					{/*  */}
				</div>
			</div>
		</div>
	);
};

export default DataLogsView;
