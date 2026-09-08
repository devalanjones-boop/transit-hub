
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const StopMap = ({ latitude, longitude, stopName }) => {

    if (
        typeof latitude !== "number" ||
        typeof longitude !== "number"
    ) {
        return (
            <p>
                Location coordinates are not available.
            </p>
        );
    }


    return (


        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-[400px] w-full rounded-lg"
        >

            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[latitude, longitude]}>

                <Popup>
                    {stopName}
                </Popup>

            </Marker>


        </MapContainer>

    );

};

export default StopMap;