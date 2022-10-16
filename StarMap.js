import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default class DailyPicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: {},
      longitude: {},
    };
  }
  render() {
    const { longitude, latitude } = this.state;
    const path =
      'https://virtualsky.lco.global/embed/index.html?longitude=${longitude}&latitude${latitude}&constellations=true&constellationlabels=true&showstarlabels=true&gridlines_az=true&live=true&projection=stereo$showdate=false&showposition=false';
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSAV} />
        <ImageBackground
          source={require('../assets/bg.jpg')}
          style={{ marginTop: 0, marginLeft: 0 }}
        />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontSize: 40,
                color: 'white',
              }}>
              Star Map Screen
            </Text>
          </View>
          <WebView
            scalesPageToFit={true}
            source={{ uri: path }}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
          <TextInput
            style={styles.textInput}
            placeHolder="Enter Your Latitude"
            placeholderTextColor="#ffff#0000000"
            onChangeText={(text) => {
              this.setState({
                latitude: text,
              });
            }}
          />
          <TextInput
            style={styles.textInput}
            placeHolder="Enter Your Longitude"
            placeholderTextColor="#ffff#0000000"
            onChangeText={(text) => {
              this.setState({
                longitude: text,
              });
            }}
          />
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.backButton}>
              Back
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 30,
    marginTop: 30,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 20,
    marginTop: 50,
    borderRadius: 20,
  },
  droidSAV: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 5,
    height: 30,
    color: 'white',
    marginBottom: 50,
    width: 50,
  },
  backButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
