import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Event from '../lib/definitions';

interface MapProps {
  events: Event[];
  onMarkerClick: (event: Event) => void;
}

const Map: React.FC<MapProps> = ({ events, onMarkerClick }) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDibWJhoUflD1Y1D-28ymxbYWIEZPuhS34`;
    script.async = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderMarkers = () => {
    return events.map((event) => (
      <div
        key={event.id}
        {...{ lat: 0, lng: 0 } as any}
        onClick={() => onMarkerClick(event)}
      >
        Marker
      </div>
    ));
  };

  if (!googleMapsLoaded) {
    return null;
  }

  return (
    <div style={{ height: '500px', width: '100%', marginTop: '20px' }}>
      <GoogleMapReact defaultCenter={{ lat: 0, lng: 0 }} defaultZoom={2}>
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
