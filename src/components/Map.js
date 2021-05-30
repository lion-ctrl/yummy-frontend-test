import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
	InfoWindow,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const Map = (props) => {
	const [map, setMap] = useState({
		address: "Venezuela",
		zoom: 10,
		mapPosition: {
			lat: 10.48801,
			lng: -66.87919,
		},
		markerPosition: {
			lat: 10.48801,
			lng: -66.87919,
		},
	});

	const onMarkerDragEnd = (e) => {
		let lat = e.latLng.lat();
		let lng = e.latLng.lng();
		Geocode.fromLatLng(lat, lng).then((res) => {
			const address = res.results[0].formatted_address;
			setMap({
				...map,
				address,
				mapPosition: {
					lat,
					lng,
				},
				markerPosition: {
					lat,
					lng,
				},
			});
		});
		props.setLocation({ lat: lat.toString(), long: lng.toString() });
	};

	const placeSelected = (place) => {
		const address = place.formatted_address;
		const lat = place.geometry.location.lat();
		const lng = place.geometry.location.lng();
		setMap({
			...map,
			address,
			mapPosition: {
				lat,
				lng,
			},
			markerPosition: {
				lat,
				lng,
			},
		});
		props.setLocation({ lat: lat.toString(), long: lng.toString() });
	};

	return (
		<GoogleMap
			defaultZoom={map.zoom}
			defaultCenter={{ lat: map.mapPosition.lng, lng: map.mapPosition.lng }}
		>
			{props.isMarkerShown && (
				<Marker
					draggable={true}
					onDragEnd={onMarkerDragEnd}
					position={{
						lat: map.markerPosition.lat,
						lng: map.markerPosition.lng,
					}}
				>
					<InfoWindow>
						<div>{map.address}</div>
					</InfoWindow>
				</Marker>
			)}
			<Autocomplete
				style={{
					width: "100%",
					height: "40px",
					paddingLeft: 16,
					marginTop: 2,
					marginBottom: "2rem",
					display: "block",
				}}
				onPlaceSelected={placeSelected}
			/>
		</GoogleMap>
	);
}

export default withScriptjs(withGoogleMap(Map));

Map.propTypes = {
    isMarkerShown: PropTypes.bool,
	setLocation: PropTypes.func.isRequired
}