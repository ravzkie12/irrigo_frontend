import { useEffect } from "react";
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const MoistureChart = ({ moistureSeries }: { moistureSeries: any }) => {
	return (
		<ResponsiveContainer
			width="100%"
			height={400}
		>
			<BarChart
				data={moistureSeries}
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
					dataKey="month"
					strokeWidth={0.5}
					axisLine={true}
					tickLine={false}
					style={{
						fontSize: "12px",
					}}
				/>
				<YAxis
					strokeWidth={0.5}
					axisLine={false}
					tickLine={false}
					style={{
						fontSize: "10px",
					}}
					domain={[0, "dataMax"]}
				/>
				<Tooltip />
				<Bar
					dataKey="ripening"
					stackId="a"
					fill="#008ffb80"
					stroke="#008ffb"
					strokeWidth={5}
				/>
				<Bar
					dataKey="reproductive"
					stackId="a"
					fill="#00ff9680"
					stroke="#00ff96"
					strokeWidth={5}
				/>
				<Bar
					dataKey="vegetative"
					stackId="a"
					fill="#feb01980"
					stroke="#feb019"
					strokeWidth={5}
				/>
				<Legend />
			</BarChart>
		</ResponsiveContainer>
	);
};

export default MoistureChart;
