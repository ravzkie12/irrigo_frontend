import moment from "moment";
import React from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const CustomScatterChart = ({ dataLogs }: { dataLogs: any }) => {
	return (
		<ResponsiveContainer
			width="100%"
			height={400}
		>
			<ScatterChart
				data={dataLogs}
				margin={{
					top: 10,
					bottom: 5,
					left: -35,
				}}
				style={{
					fontSize: "12px",
				}}
			>
				<CartesianGrid
					opacity={0.3}
					vertical={false}
				/>
				<XAxis
					dataKey="date"
					strokeWidth={0.5}
					axisLine={true}
					tickLine={false}
					style={{
						fontSize: "12px",
					}}
					tick={(value) => {
						console.log("Tick payload: ", value);
						if (value.visibleTicksCount % 1 === 0) {
							return value.visibleTicksCount;
						}
					}}
				/>
				<YAxis
					dataKey="value"
					strokeWidth={0.5}
					axisLine={false}
					tickLine={false}
					style={{
						fontSize: "10px",
					}}
					domain={[0, "dataMax"]}
					// tick={(value) => {
					// 	console.log("Tick payload: ", value);
					// 	if (value.visibleTicksCount % 1 === 0) {
					// 		return value.visibleTicksCount;
					// 	}
					// }}
				/>
				<Tooltip content={<CustomToolTip />} />
				<Scatter
					dataKey="value"
					fill="#89644e"
				/>
			</ScatterChart>
		</ResponsiveContainer>
	);
};

function CustomToolTip({ active, payload, label }: any) {
	if (active && payload) {
		return (
			<div className="bg-white p-2 flex flex-col shadow border-b border-gray-300 text-gray-700">
				<h4 className="capitalize font-bold">
					Date: <span className="font-thin">{label ?? ""}</span>
				</h4>
				<h4 className="capitalize font-bold">
					Value:
					<span className="font-thin">
						{payload[0]?.payload ? payload[0]?.payload.value : ""}
					</span>
				</h4>
			</div>
		);
	}
	return null;
}

export default CustomScatterChart;
