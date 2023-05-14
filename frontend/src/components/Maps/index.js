
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./index.css";

const Map = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    });
    const center = useMemo(() => ({ lat: 31.481630977050962, lng: 74.30299263917533 }), []);

    return (
        <div className="map">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={10}
                >
                    <Marker position={{ lat: 31.481630977050962, lng: 74.30299263917533 }} />
                </GoogleMap>
            )}
        </div>
    );
};

export default Map;