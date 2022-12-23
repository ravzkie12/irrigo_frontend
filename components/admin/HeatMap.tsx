import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

const coordinates: any = [7.3209, 125.6736];

const HeatMap = () => {
	return (
		<div className="w-full h-96 bg-white font-noto flex flex-col gap-y-5 text-gray-700 p-5 shadow border-b border-gray-200 rounded-lg overflow-hidden">
			<MapContainer
				center={coordinates}
				zoom={12}
				scrollWheelZoom={false}
				style={{
					height: "100%",
					width: "100vw",
				}}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker
					position={coordinates}
					icon={L.divIcon({
						iconSize: [30, 30],
						iconAnchor: [30 / 2, 30 + 9],
						html: `
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid meet" 
                            viewBox="0 0 24 24"
                        >
                            <path fill="#89644e" 
                                d="M12.275 19q.3-.025.513-.237q.212-.213.212-.513q0-.35-.225-.562q-.225-.213-.575-.188q-1.025.075-2.175-.562q-1.15-.638-1.45-2.313q-.05-.275-.263-.45Q8.1 14 7.825 14q-.35 0-.575.262q-.225.263-.15.613q.425 2.275 2 3.25q1.575.975 3.175.875ZM12 22q-3.425 0-5.712-2.35Q4 17.3 4 13.8q0-2.5 1.988-5.437Q7.975 5.425 12 2q4.025 3.425 6.013 6.363Q20 11.3 20 13.8q0 3.5-2.288 5.85Q15.425 22 12 22Z"
                            />
                        </svg>
                        `,
					})}
				>
					<Popup>This is a popup!</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default HeatMap;
