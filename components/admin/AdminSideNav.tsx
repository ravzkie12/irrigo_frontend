import React from "react";
import { useRouter } from "next/router";

const AdminSideNav = () => {
	const router = useRouter();
	const isItemClicked = (path: string) => {
		router.push(path);
	};

	return (
		<div className="w-full h-screen bg-white shadow flex flex-col items-center font-noto gap-y-5 px-5">
			{/*  */}
			<div className="w-full flex gap-x-1 pt-16 pb-5 px-5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					className="w-5 h-5 text-[#89644e]"
				>
					<path
						fill="currentColor"
						d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87z"
					/>
				</svg>
				<h4 className="text-2xl text-[#89644e] font-black tracking-widest">
					Irrigo.
				</h4>
			</div>
			{/*  */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin" ? "bg-[#EEEEEE]" : "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-6 h-6 ${
						router.pathname === "/admin" ? "text-[#89644e]" : "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin" ? "text-[#89644e]" : "text-gray-700"
					}`}
				>
					Dashboard
				</p>
			</div>
			{/*  */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/farmer_list"
						? "bg-[#EEEEEE]"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin/farmer_list")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-6 h-6 ${
						router.pathname === "/admin/farmer_list"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/farmer_list"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					Farmers
				</p>
			</div>
			{/*  */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/moisture"
						? "bg-[#EEEEEE]"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin/moisture")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 16 16"
					className={`w-6 h-6 ${
						router.pathname === "/admin/moisture"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					<path
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1"
						d="M8.75 6.75c0 1.25-.75 3-.75 3m.25-2.5s.75-2-1-3.5s-4.5-1-4.5-1s0 2 1.5 3.5s4 1 4 1zm.5-1s-.75-2 1-3.5s4.5-1 4.5-1s0 2-1.5 3.5s-4 1-4 1zm-4 3.5h6.5s.5 4.5-3.25 4.5s-3.25-4.5-3.25-4.5z"
					/>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/moisture"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					Rice Stage
				</p>
			</div>
			{/*  */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/heat_map"
						? "bg-[#EEEEEE]"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin/heat_map")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 16 16"
					className={`w-6 h-6 ${
						router.pathname === "/admin/heat_map"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					<g fill="currentColor">
						<path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585a1.5 1.5 0 0 1 1 1.415z" />
						<path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z" />
					</g>
				</svg>
				<p
					className={`font-medium ${
						router.pathname === "/admin/heat_map"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					Heat Map
				</p>
			</div>
			{/*  */}
			<div
				className={`w-full flex items-center gap-x-5 px-5 py-3 ${
					router.pathname === "/admin/data_logs"
						? "bg-[#EEEEEE]"
						: "bg-transparent"
				} rounded-lg hover:cursor-pointer`}
				onClick={() => isItemClicked("/admin/data_logs")}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-6 h-6 ${
						router.pathname === "/admin/data_logs"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
					/>
				</svg>

				<p
					className={`font-medium ${
						router.pathname === "/admin/data_logs"
							? "text-[#89644e]"
							: "text-gray-700"
					}`}
				>
					Data Logs
				</p>
			</div>
			{/*  */}
		</div>
	);
};

export default AdminSideNav;
