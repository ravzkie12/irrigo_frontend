import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { getDataLogs, fetchLivelihoodSummary } from "../../redux/dataSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import ScatterChart from "../../components/CustomScatterChart";
import { MoonLoader } from "react-spinners";
import WorkCard from "../../components/admin/WorkCard";

const chartOptions: any = {
	labels: ["Ripening", "Reproductive", "Vegetative"],
	colors: ["#F7C69B", "#67493C", "#7A6149"],
	fill: {
		type: "image",
		opacity: 0.85,
		image: {
			src: ["/images/dry.jpg", "/images/moderate.jpg", "/images/wet.jpg"],
			width: "100%",
			imagedHeight: "100%",
		},
	},
	legend: {
		position: "bottom",
	},
};
const chartSeries = [15, 20, 65];

const DasboardView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, dataLogs, livelihoodSummary } = useAppSelector(
		(state) => state.dataState
	);

	const formattedDataLogs = dataLogs.map((log: any) => {
		return {
			value: log.value,
			date: moment(log.timestamp).format("LL"),
			time: moment(log.timestamp).format("hh:mm A"),
		};
	});

	useEffect(() => {
		dispatch(getDataLogs());
		dispatch(fetchLivelihoodSummary());
	}, []);

	return (
		<div className="w-full flex flex-col gap-y-5 font-noto text-gray-700">
			<div className="w-full grid grid-cols-4 gap-x-5">
				<WorkCard
					workType="Farmers"
					livelihood={livelihoodSummary.find((livelihood: any) =>
						livelihood.main_livelihood.toLowerCase().includes("farmer")
					)}
				/>
				<WorkCard
					workType="Farmworker/Laborers"
					livelihood={livelihoodSummary.find((livelihood: any) =>
						livelihood.main_livelihood.toLowerCase().includes("laborer")
					)}
				/>
				<WorkCard
					workType="Fisherfolks"
					livelihood={livelihoodSummary.find((livelihood: any) =>
						livelihood.main_livelihood.toLowerCase().includes("fisher")
					)}
				/>
				<WorkCard
					workType="Agri Youths"
					livelihood={livelihoodSummary.find((livelihood: any) =>
						livelihood.main_livelihood.toLowerCase().includes("agri")
					)}
				/>
			</div>
			<div className="grid grid-cols-3 gap-x-5">
				{/*  */}
				<div className="col-span-2 w-full bg-white flex flex-col gap-y-5 p-5 shadow border-b border-gray-200 rounded-lg">
					<h4 className="text-xl font-bold">Data Chart</h4>
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					<div className="w-full h-96 flex justify-center items-center">
						{dataLoading && (
							<div className="w-full flex justify-center items-center">
								<MoonLoader
									loading={dataLoading}
									color="#89644e"
									speedMultiplier={1}
									size={100}
								/>
							</div>
						)}
						{!dataLoading && <ScatterChart dataLogs={formattedDataLogs} />}
					</div>
				</div>
				{/*  */}
				<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
					<h4 className="text-xl font-bold">Moisture Levels</h4>
					<div className="w-full border-b border-gray-200 -mt-3"></div>
					<div className="w-full h-96">
						<Chart
							options={chartOptions}
							series={chartSeries}
							width="100%"
							height="100%"
							type="pie"
							stacked={false}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DasboardView;
