import { useEffect } from "react";
import Chart from "react-apexcharts";

const HeatMapChat = ({ heatOptions, heatSeries }: any) => {
	return (
		<Chart
			options={heatOptions}
			series={heatSeries}
			width="100%"
			height="100%"
			type="heatmap"
		/>
	);
};

export default HeatMapChat;
