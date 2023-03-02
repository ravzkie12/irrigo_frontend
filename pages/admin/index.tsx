import React from "react";
import dynamic from "next/dynamic";

const NoSSRDashboard = dynamic(
	() => import("../../views/admin/DashboardView"),
	{
		ssr: false,
	}
);

export default function index() {
	return <NoSSRDashboard />;
}
