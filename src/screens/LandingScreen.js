import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    title: 'React Native Track Player',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Example Demos</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Playlist')}>
          <Text>Playlist Example</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
