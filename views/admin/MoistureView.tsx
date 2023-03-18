import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUbidotsData } from "../../redux/dataSlice";
import MoistureChart from "../../components/admin/MoistureChart";
import { ExportToCsv } from "export-to-csv";

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

	useEffect(() => {
		dispatch(getUbidotsData());
	}, []);

	const onExportData = () => {
		const csvRiceStageData = moistureSeries.map((data: any) => {
			return {
				type: Object.keys(data)[0],
				value: Object.values(data)[0],
			};
		});
		const options = {
			useKeysAsHeaders: true,
			filename: "Rice Stage",
		};
		const csvExporter = new ExportToCsv(options);
		csvRiceStageData.length > 0
			? csvExporter.generateCsv(csvRiceStageData)
			: null;
	};

	return (
		<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
			{/*  */}
			<div className="w-full flex justify-between">
				<h4 className="text-xl font-bold">Rice Stage</h4>
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
			<div className="w-full h-96">
				<MoistureChart moistureSeries={moistureSeries} />
			</div>
		</div>
	);
};

export default MoistureView;
