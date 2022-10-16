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
  Alert,
  Linking,
} from 'react-native';
import axios from 'axios';

export default class DailyPicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apod: {},
    };
  }

  componentDidMount() {
    this.getAPOD();
    try {
      setInterval(async () => {
        this.getAPOD();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  getAPOD = () => {
    axios
      .get(
        'https://api.nasa.gov/planetary/apod?api_key=CSP3XPPXgwynHmy4sfwcGY6wWfVBHvRFdyVkxqkw'
      )
      .then((response) => {
        this.setState({ apod: response.data });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  render() {
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
              Daily Pic Screen
            </Text>
          </View>

          <TouchableOpacity
            style={styles.listContainer}
            onPress={() =>
              Linking.openURL(this.state.apod.url).catch((err) =>
                console.error("Couldn't load page", err)
              )
            }>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/play-video.png')}
                style={{ width: 50, height: 50, justifyContent: 'center' }}
              />
            </View>
          </TouchableOpacity>

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
  listContainer: {},
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
    marginTop: 70,
  },
  iconContainer: { alignItems: 'center', marginTop: 20 },
});
