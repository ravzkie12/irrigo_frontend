import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import ShowCrimes from "./ShowCrimes";

function Map() {
	const [crimes, setCrimes] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getCrimes = async () => {
			try {
				setIsLoading(true);
				const { data } = await axios.get(
					"https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10"
				);
				setIsLoading(false);
				console.log("Crimes data: ", data);
				return data;
			} catch (error) {
				console.error(error);
			}
		};
		setCrimes(getCrimes());
	}, []);

	return (
		<MapContainer
			center={[52.6376, -1.135171]}
			zoom={13}
			style={{
				height: "100%",
				width: "100vw",
			}}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{!isLoading && <ShowCrimes data={crimes} />}
		</MapContainer>
	);
}

export default Map;
