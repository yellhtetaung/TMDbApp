import colors from 'libs/colors';
import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const imageBg = require('../assets/background.jpg');

interface LoginProps {
  navigation: any;
}

export default function Login({navigation}: LoginProps) {
  return (
    <ImageBackground source={imageBg} style={styles.container} blurRadius={10}>
      <View style={styles.innerContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>MOVIE APP</Text>
          <Text style={styles.description}>Watch & Relax</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Home')}>
        <Text style={styles.buttonLabel}>Go to home</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    padding: 20,
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    padding: 20,
    gap: 20,
  },

  title: {
    color: colors.white,
    fontSize: 40,
    fontFamily: 'Poppins-Black',
    textAlign: 'center',
    letterSpacing: 2,
  },

  description: {
    color: colors.light,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
  },

  button: {
    backgroundColor: colors.main,
    borderRadius: 10,

    padding: 20,
    paddingHorizontal: 40,
    marginBottom: 30,
  },

  buttonLabel: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    elevation: 5,
  },
});
