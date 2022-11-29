import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getFarmers, deleteAccount } from "../../redux/dataSlice";
import MoonLoader from "react-spinners/MoonLoader";
import FarmerListTable from "./FarmerListTable";
import ViewModal from "../../components/ViewModal";
import WarningModal from "../../components/WarningModal";
import moment from "moment";
import { ExportToCsv } from "export-to-csv";

const FarmerListView = () => {
	const dispatch = useAppDispatch();
	const { dataLoading, farmersList } = useAppSelector(
		(state: any) => state.dataState
	);
	const [showViewModal, setShowViewModal] = useState(false);
	const [showWarningModal, setShowWarningModal] = useState(false);
	const [selectedFarmer, setSelectedFarmer] = useState<any>({});
	const [selectedID, setSelectedID] = useState<number>(0);

	useEffect(() => {
		dispatch(getFarmers());
	}, []);

	const onViewModal = (farmer: any) => {
		setSelectedFarmer(farmer);
		setShowViewModal(true);
		console.log("Selected Farmer: ", selectedFarmer);
	};

	const onWarningModal = (farmer_id: number) => {
		setSelectedID(farmer_id);
		setShowWarningModal(true);
	};

	const onConfirmDelete = () => {
		dispatch(deleteAccount(selectedID)).then(() => {
			dispatch(getFarmers());
			setShowWarningModal(false);
		});
	};

	const onExportData = () => {
		const csvFarmers = farmersList.map((farmer: any) => {
			if (
				farmer?.livelihood_product !== undefined &&
				farmer.livelihood_product?.length
			) {
				return {
					first_name: farmer.first_name,
					last_name: farmer.last_name,
					mobile: farmer.mobile,
					email: farmer.email,
					date_of_birth:
						farmer.date_of_birth !== undefined && farmer.date_of_birth.length
							? moment(farmer.date_of_birth).format("ll")
							: "N/A",
					place_of_birth: farmer.place_of_birth ?? "N/A",
					civil_status: farmer.civil_status ?? "N/A",
					educational_attainment: farmer.educational_attainment ?? "N/A",
					is_pwd: farmer.is_pwd === 0 ? "Yes" : "No",
					is_4ps_beneficiary: farmer.is_4ps_beneficiary === 0 ? "Yes" : "No",
					is_ip: farmer.is_ip === 0 ? "Yes" : "No",
					main_livelihood: farmer.main_livelihood ?? "N/A",
					product:
						farmer?.livelihood_product !== undefined &&
						farmer?.livelihood_product.length
							? farmer?.livelihood_product
							: "N/A",
				};
			} else if (
				farmer?.laborer_activity !== undefined &&
				farmer.laborer_activity?.length
			) {
				return {
					first_name: farmer.first_name,
					last_name: farmer.last_name,
					mobile: farmer.mobile,
					email: farmer.email,
					date_of_birth:
						farmer.date_of_birth !== undefined && farmer.date_of_birth.length
							? moment(farmer.date_of_birth).format("ll")
							: "N/A",
					place_of_birth: farmer.place_of_birth ?? "N/A",
					civil_status: farmer.civil_status ?? "N/A",
					educational_attainment: farmer.educational_attainment ?? "N/A",
					is_pwd: farmer.is_pwd === 0 ? "Yes" : "No",
					is_4ps_beneficiary: farmer.is_4ps_beneficiary === 0 ? "Yes" : "No",
					is_ip: farmer.is_ip === 0 ? "Yes" : "No",
					main_livelihood: farmer.main_livelihood ?? "N/A",
					product:
						farmer?.laborer_activity !== undefined &&
						farmer?.laborer_activity.length
							? farmer?.laborer_activity
							: "N/A",
				};
			} else if (
				farmer?.fishing_activity !== undefined &&
				farmer.fishing_activity?.length
			) {
				return {
					first_name: farmer.first_name,
					last_name: farmer.last_name,
					mobile: farmer.mobile,
					email: farmer.email,
					date_of_birth:
						farmer.date_of_birth !== undefined && farmer.date_of_birth.length
							? moment(farmer.date_of_birth).format("ll")
							: "N/A",
					place_of_birth: farmer.place_of_birth ?? "N/A",
					civil_status: farmer.civil_status ?? "N/A",
					educational_attainment: farmer.educational_attainment ?? "N/A",
					is_pwd: farmer.is_pwd === 0 ? "Yes" : "No",
					is_4ps_beneficiary: farmer.is_4ps_beneficiary === 0 ? "Yes" : "No",
					is_ip: farmer.is_ip === 0 ? "Yes" : "No",
					main_livelihood: farmer.main_livelihood ?? "N/A",
					product:
						farmer?.fishing_activity !== undefined &&
						farmer?.fishing_activity.length
							? farmer?.fishing_activity
							: "N/A",
				};
			} else if (
				farmer?.involvement_type !== undefined &&
				farmer.involvement_type?.length
			) {
				return {
					first_name: farmer.first_name,
					last_name: farmer.last_name,
					mobile: farmer.mobile,
					email: farmer.email,
					date_of_birth:
						farmer.date_of_birth !== undefined && farmer.date_of_birth.length
							? moment(farmer.date_of_birth).format("ll")
							: "N/A",
					place_of_birth: farmer.place_of_birth ?? "N/A",
					civil_status: farmer.civil_status ?? "N/A",
					educational_attainment: farmer.educational_attainment ?? "N/A",
					is_pwd: farmer.is_pwd === 0 ? "Yes" : "No",
					is_4ps_beneficiary: farmer.is_4ps_beneficiary === 0 ? "Yes" : "No",
					is_ip: farmer.is_ip === 0 ? "Yes" : "No",
					main_livelihood: farmer.main_livelihood ?? "N/A",
					product:
						farmer?.involvement_type !== undefined &&
						farmer?.involvement_type.length
							? farmer?.involvement_type
							: "N/A",
				};
			}
		});
		const finalCSVFarmers = csvFarmers.filter(
			(farmer: any) => farmer !== undefined
		);
		console.log("Farmers: ", finalCSVFarmers);
		const options = {
			useKeysAsHeaders: true,
			filename: "Farmers List",
		};
		const csvExporter = new ExportToCsv(options);
		csvExporter.generateCsv(finalCSVFarmers);
	};

	return (
		<div className="relative w-full bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg">
			{/*  */}
			<ViewModal
				isShow={showViewModal}
				viewTitle="Farmer Details"
				viewText={`${selectedFarmer?.first_name} ${selectedFarmer?.last_name} Account Details`}
				onClose={() => setShowViewModal(false)}
			>
				<div className="w-[800px] grid grid-cols-2 gap-x-5 gap-y-8">
					{/* First Name */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">First Name</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.first_name}
						</p>
					</div>
					{/* Last Name */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">Last Name</h4>
						<p className="text-sm text-gray-500">{selectedFarmer?.last_name}</p>
					</div>
					{/* Mobile Number */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Mobile Number
						</h4>
						<p className="text-sm text-gray-500">{selectedFarmer?.mobile}</p>
					</div>
					{/* Email */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">Email</h4>
						<p className="text-sm text-gray-500">{selectedFarmer?.email}</p>
					</div>
					{/* Birthdate */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Date of Birth
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.date_of_birth
								? moment(selectedFarmer?.date_of_birth).format("LL")
								: "N/A"}
						</p>
					</div>
					{/* Place of Birth */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Place of Birth
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.place_of_birth
								? selectedFarmer?.place_of_birth
								: "N/A"}
						</p>
					</div>
					{/* Civil Status */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">Civil Status</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.civil_status
								? selectedFarmer?.civil_status
								: "N/A"}
						</p>
					</div>
					{/* Educational Attainment */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Educational Attainment
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.educational_attainment
								? selectedFarmer?.educational_attainment
								: "N/A"}
						</p>
					</div>
					{/* PWD */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Person with Disability (PWD)
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.is_pwd === 0 ? "Yes" : "No"}
						</p>
					</div>
					{/* 4ps Beneficiary */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							4P's Beneficiary
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.is_4ps_beneficiary === 0 ? "Yes" : "No"}
						</p>
					</div>
					{/* Ingigenious Group */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Indigenious Group
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.is_ip === 0 ? "Yes" : "No"}
						</p>
					</div>
					{/* Main Livelihood */}
					<div className="flex flex-col gap-y-1">
						<h4 className="text-sm font-medium tracking-wider">
							Main Livelihood
						</h4>
						<p className="text-sm text-gray-500">
							{selectedFarmer?.main_livelihood
								? selectedFarmer?.main_livelihood
								: "N/A"}
						</p>
					</div>
					{/* Livelihood Product (For Farmer) */}
					{selectedFarmer?.livelihood_product !== undefined &&
					selectedFarmer?.livelihood_product?.length ? (
						<div className="flex flex-col gap-y-1">
							<h4 className="text-sm font-medium tracking-wider">
								Livelihood Product
							</h4>
							<p className="text-sm text-gray-500">
								{selectedFarmer?.livelihood_product ?? "N/A"}
							</p>
						</div>
					) : null}
					{/* Worker Activity (For Laborer) */}
					{selectedFarmer?.laborer_activity !== undefined &&
					selectedFarmer?.laborer_activity?.length ? (
						<div className="flex flex-col gap-y-1">
							<h4 className="text-sm font-medium tracking-wider">
								Worker Activity
							</h4>
							<p className="text-sm text-gray-500">
								{selectedFarmer?.laborer_activity ?? "N/A"}
							</p>
						</div>
					) : null}
					{/* Fishing Activity (For Fisherr) */}
					{selectedFarmer?.fishing_activity !== undefined &&
					selectedFarmer?.fishing_activity?.length ? (
						<div className="flex flex-col gap-y-1">
							<h4 className="text-sm font-medium tracking-wider">
								Fishing Activity
							</h4>
							<p className="text-sm text-gray-500">
								{selectedFarmer?.fishing_activity ?? "N/A"}
							</p>
						</div>
					) : null}
					{/* Involvement Type (For Agri Youth) */}
					{selectedFarmer?.involvement_type !== undefined &&
					selectedFarmer?.involvement_type?.length ? (
						<div className="flex flex-col gap-y-1">
							<h4 className="text-sm font-medium tracking-wider">
								Involvement Type
							</h4>
							<p className="text-sm text-gray-500">
								{selectedFarmer?.involvement_type ?? "N/A"}
							</p>
						</div>
					) : null}
					{/* Ownership & Signature */}
					<div className="col-span-2 grid grid-cols-2 gap-x-5">
						{/* Ownership Document */}
						<div className="flex flex-col gap-y-1">
							<h4 className="text-sm font-medium tracking-wider">
								Ownership Document/Proof
							</h4>
							<div className="w-full h-72 bg-gray-100 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center">
								{selectedFarmer?.ownership_document !== undefined &&
								selectedFarmer?.ownership_document?.length ? (
									<img
										src={selectedFarmer?.ownership_document}
										className="max-w-full max-h-full"
									/>
								) : (
									<p className="text-base font-light text-gray-600">N/A</p>
								)}
							</div>
						</div>
						{/* Signature */}
						<div className="flex flex-col gap-y-1">
							<h4 className="text-sm font-medium tracking-wider">Signature</h4>
							<div className="w-full h-72 bg-gray-100 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center">
								{selectedFarmer?.signature !== undefined &&
								selectedFarmer?.signature?.length ? (
									<img
										src={selectedFarmer?.signature}
										className="max-w-full max-h-full"
									/>
								) : (
									<p className="text-base font-light text-gray-600">N/A</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</ViewModal>
			<WarningModal
				isShow={showWarningModal}
				warningText="account"
				onConfirm={() => onConfirmDelete()}
				onCancel={() => setShowWarningModal(false)}
			/>
			<div className="w-full flex justify-between">
				<h4 className="text-xl font-bold">Farmers List</h4>
				<button
					className="bg-transparent text-[#89644e]"
					title="Export Excel"
					onClick={onExportData}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
				</button>
			</div>
			{/*  */}
			<div className="w-full border-b border-gray-200 -mt-3"></div>
			{/*  */}
			{dataLoading && (
				<div className="w-full flex justify-center items-center">
					<MoonLoader
						loading={dataLoading}
						color="#89644e"
						speedMultiplier={1}
						size={70}
					/>
				</div>
			)}
			{!dataLoading && (
				<FarmerListTable
					farmersList={farmersList}
					onShowViewModal={(farmer: any) => onViewModal(farmer)}
					onShowWarningModal={(farmer_id: number) => onWarningModal(farmer_id)}
				/>
			)}
		</div>
	);
};

export default FarmerListView;
