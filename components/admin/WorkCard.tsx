import React from "react";

interface WorkCardParams {
	workType: string;
	livelihood: any;
}

const WorkCard = ({ workType, livelihood }: WorkCardParams) => {
	return (
		<div className="w-full bg-white font-noto flex flex-col gap-y-3 text-gray-700 p-5 shadow border-l-4 border-[#89644e] rounded-lg">
			<h4 className="text-base font-medium tracking-wider">{workType}</h4>
			<p className="text-2xl font-bold">
				{livelihood !== undefined ? livelihood.count : 0}
			</p>
		</div>
	);
};

export default WorkCard;
