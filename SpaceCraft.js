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
  FlatList,
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

export default class DailyPicScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircrafts: {},
    };
  }

  getData = () => {
    axios
      .get('https://ll.thespacedevs.com/2.0.0/config/spacecraft/')
      .then((response) => {
        this.setState({ aircrafts: response.data.results });
        console.log(response.data.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.getData();
    try {
      setInterval(async () => {
        this.getData();
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.spacecraftImage}>
        <Image
          source={{ uri: item.agency.image_url }}
          style={styles.spacecraftImage}
        />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemAgencyName}>{item.agency.name}</Text>
        <Text>DESCRIPTION</Text>
        <Text style={styles.itemAgencyDes}>{item.agency.description}</Text>
      </View>
    );
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
                fontSize: 37,
                color: 'white',
              }}>
              Spacecraft Screen
            </Text>
          </View>

          <View style={styles.flatlist}>
            <View style={styles.flatlistText}>
              <Text>Spacecrafts</Text>
            </View>
            <View style={styles.flatlistSpecs}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.aircrafts}
                renderItem={this.renderItem}
              />
            </View>
          </View>

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
  spacecraftImage: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 5,
    borderRadius: 30,
    marginTop: 30,
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
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemAgencyName: {
    color: '#696969',
  },
  itemAgencyDes: {
    color: '#A9A9A9',
    marginLeft: 10,
    marginRight: 10,
  },
  flatlist: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistText: {
    flex: 0.25,
  },
  flatlistSpecs: {
    flex: 0.75,
  },
});
