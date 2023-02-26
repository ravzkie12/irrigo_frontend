import React from "react";

const Pagination = ({
	totalLogs,
	logsPerPage,
	currentPage,
	setCurrentPage,
}: {
	totalLogs: number;
	logsPerPage: number;
	currentPage: number;
	setCurrentPage: CallableFunction;
}) => {
	let pages = [];
	for (let i = 1; i <= Math.ceil(totalLogs / logsPerPage); i++) {
		pages.push(i);
	}
	return (
		<div className="w-full flex justify-center gap-x-3">
			{pages.map((page: any, index: number) => {
				return (
					<button
						key={index}
						className={`px-4 py-2  border border-gray-200 rounded ${
							currentPage === page
								? "bg-[#89644e] text-white"
								: "bg-white text-current"
						}`}
						onClick={() => setCurrentPage(page)}
					>
						{page}
					</button>
				);
			})}
		</div>
	);
};

export default Pagination;
