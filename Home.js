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
} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />

        <ImageBackground
          source={require('../assets/bg.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>ISS Tracker App</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SpaceCraft')}
            style={styles.button}>
            <Text style={styles.buttonText}>Space Craft</Text>
            <Image
              source={require('../assets/SpaceCraft.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('StarMap')}
            style={styles.button}>
            <Text style={styles.buttonText}>Star Map</Text>
            <Image
              source={require('../assets/Star.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DailyPic')}
            style={styles.button}>
            <Text style={styles.buttonText}>Daily Pic</Text>
            <Image
              source={require('../assets/Camera.jpg')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleBar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 30,
    marginTop: 30,
  },
  titleText: {
    fontSize: 45,
    color: 'white',
  },
  container: {
    flex: 1,
  },
  button: {
    marginTop: 60,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'white',
    width: 230,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
  buttons: {
    marginTop: 80,
    alignItems: 'center',
  },
  buttonImage: {
    position: 'absolute',
    top: -20,
    right: -15,
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
});
