import React from "react";
import dynamic from "next/dynamic";

const NoSSRDashboard = dynamic(() => import("../../views/admin/DasboardView"), {
	ssr: false,
});

export default function index() {
	return <NoSSRDashboard />;
}
