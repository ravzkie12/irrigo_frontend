import moment from "moment";

const DataLogsTable = ({ dataLogsList }: { dataLogsList: any }) => {
	return (
		<div className="w-full overflow-x-auto flex justify-center">
			<table className="w-full md:w-3/5 table-auto">
				<thead>
					<tr className="bg-[#EEEEEE] text-gray-500 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">Value</th>
						<th className="py-3 px-6 text-left">Date</th>
						<th className="py-3 px-6 text-left">Time</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-light">
					{dataLogsList.map((dataLog: any) => {
						return (
							<tr
								key={dataLog.timestamp}
								className="border-b border-gray-200 hover:bg-gray-100"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{dataLog.value}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(dataLog).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(dataLog).format("hh:mm A")}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default DataLogsTable;
