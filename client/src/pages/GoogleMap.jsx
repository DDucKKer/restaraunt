import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapStyle from './MapStyle'

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
export default class GoogleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 46.454626,
      lng: 30.676002
    },
    zoom: 17
  };
    renderMarkers(map, maps) {
        let marker = new maps.Marker({
            position: this.props.center,
            map,
            title: 'Our adress!',
        });
    }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyABT_jld8sMLKpgpoK6BMhBT9ph1g0AbnU' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
        >
          <AnyReactComponent
            lat={46.454626}
            lng={30.676002}
            text="Odessa restaurants market"
          />
        </GoogleMapReact>
      </div>
    );
  }
}