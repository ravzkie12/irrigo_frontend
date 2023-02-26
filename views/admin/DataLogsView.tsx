import React, { useEffect, useState } from "react";
import DataLogsTable from "./DataLogsTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getDataLogs } from "../../redux/dataSlice";
import { MoonLoader } from "react-spinners";
import Pagination from "../../components/Pagination";

const DataLogsView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, dataLogs } = useAppSelector((state) => state.dataState);
	const [currentPage, setCurrentPage] = useState(1);
	const [logsPerPage, setLogsPerPage] = useState(10);

	useEffect(() => {
		dispatch(getDataLogs());
	}, []);

	const lastLogIndex = currentPage * logsPerPage;
	const firstLogIndex = lastLogIndex - logsPerPage;
	const currentLogs = dataLogs.slice(firstLogIndex, lastLogIndex);

	return (
		<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
			<h4 className="text-xl font-bold">Data Logs</h4>
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
				totalLogs={dataLogs.length}
				logsPerPage={logsPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</div>
	);
};

export default DataLogsView;
