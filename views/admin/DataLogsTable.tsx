import moment from "moment";

const DataLogsTable = ({ dataLogsList }: { dataLogsList: any }) => {
	const getTypeText = (dataValue: number): string => {
		let typeText = "";
		if (dataValue <= 55) {
			typeText = "Ripening";
		} else if (dataValue <= 75) {
			typeText = "Reproductive";
		} else if (dataValue <= 100) {
			typeText = "Vegetative";
		}
		return typeText;
	};

	return (
		<div className="w-full overflow-x-auto flex justify-center">
			<table className="w-full md:w-3/5 table-auto">
				<thead>
					<tr className="bg-[#EEEEEE] text-gray-500 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">Value</th>
						<th className="py-3 px-6 text-left">Date</th>
						<th className="py-3 px-6 text-left">Time</th>
						<th className="py-3 px-6 text-left">Type</th>
						<th className="py-3 px-6 text-left">Coordinates</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-medium">
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
									{moment(dataLog.timestamp).format("LL")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(dataLog.timestamp).format("hh:mm A")}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{getTypeText(dataLog.value)}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{moment(dataLog.timestamp).format("LL") ===
									moment(new Date("May 24, 2023")).format("LL")
										? "7.3137, 125.6711"
										: "7.3409, 125.6369"}
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
