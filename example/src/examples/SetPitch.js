import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';

import sheet from '../styles/sheet';

class SetPitch extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      followPitch: 15,
      zoomLevel: 16,
      duration: 300,
    };

    this._pitchOptions = [
      { label: '15', data: 15 },
      { label: '45', data: 45 },
      { label: '60', data: 60 },
    ];

    this.onUpdatePitch = this.onUpdatePitch.bind(this);
  }

  componentDidMount() {
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  onUpdatePitch(index, pitch) {
    this.setState({ followPitch: pitch });
  }

  render() {
    return (
      <TabBarPage
        {...this.props}
        options={this._pitchOptions}
        onOptionPress={this.onUpdatePitch}>

        <MapboxGL.MapView style={sheet.matchParent}>
          <MapboxGL.Camera
            {...this.state}
            followUserLocation />
          <MapboxGL.UserLocation />
        </MapboxGL.MapView>

      </TabBarPage>
    );
  }
}

export default SetPitch;