import React from "react";
import Chart from "react-apexcharts";

const chartOptions: any = {
	labels: ["Dry", "Moderate", "Wet"],
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
};
const chartSeries = [20, 15, 65];

const DasboardView = () => {
	return (
		<div className="w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
			<h4 className="text-xl font-bold">Dashboard</h4>
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
	);
};

export default DasboardView;
