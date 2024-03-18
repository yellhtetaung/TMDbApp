import {View, StyleSheet} from 'react-native';
import React from 'react';

const Separator = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 10,
  },
});

export default Separator;
