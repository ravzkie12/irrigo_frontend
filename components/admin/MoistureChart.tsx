import { useEffect } from "react";
import Chart from "react-apexcharts";

const MoistureChart = ({
	moistureOptions,
	moistureSeries,
	isFistLoad,
}: any) => {
	useEffect(() => {
		if (isFistLoad) {
			return;
		}
	}, []);

	return (
		<Chart
			options={moistureOptions}
			series={moistureSeries}
			width="100%"
			height="100%"
			type="bar"
			stacked={true}
		/>
	);
};

export default MoistureChart;
