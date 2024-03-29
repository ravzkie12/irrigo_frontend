const FarmerListTable = ({
	farmersList,
	onShowViewModal,
	onShowWarningModal,
}: any) => {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-max w-full table-auto">
				<thead>
					<tr className="bg-[#EEEEEE] text-gray-500 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">First Name</th>
						<th className="py-3 px-6 text-left">Last Name</th>
						<th className="py-3 px-6 text-left">Mobile</th>
						<th className="py-3 px-6 text-left">Email</th>
						<th className="py-3 px-6 text-left">Main Livelihood</th>
						<th className="py-3 px-6 text-center">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-600 text-sm font-medium">
					{farmersList.map((farmer: any) => {
						return (
							<tr
								key={farmer.id}
								className="border-b border-gray-200 hover:bg-gray-100"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{farmer.first_name}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{farmer.last_name}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{farmer.mobile}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{farmer.email}
								</td>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{farmer?.main_livelihood ? farmer?.main_livelihood : "N/A"}
								</td>
								<td className="py-3 px-6 text-center">
									<div className="flex items-center justify-center gap-x-5">
										<div
											className="w-4 mr-2 transform hover:text-[#89644e] hover:cursor-pointer"
											onClick={() => onShowViewModal(farmer)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
												/>
											</svg>
										</div>
										<div
											className="w-4 mr-2 transform hover:text-[#89644e] hover:cursor-pointer"
											onClick={() => onShowWarningModal(farmer.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</div>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default FarmerListTable;
