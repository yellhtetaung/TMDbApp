/* eslint-disable react-native/no-inline-styles */
import colors from 'libs/colors';
import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {PopularMovies} from 'types/types';
import Icon from 'react-native-vector-icons/AntDesign';

interface MovieCardProps extends PopularMovies {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  release_date,
  onPress,
  backdrop_path,
  poster_path,
  style,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        {imageLoading && (
          <ActivityIndicator size={'large'} style={styles.image} />
        )}

        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              backdrop_path ? backdrop_path : poster_path
            }`,
          }}
          style={[
            styles.image,
            {
              display: imageLoading ? 'none' : 'flex',
            },
          ]}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>

      <Text style={styles.title}>{title}</Text>

      <View>
        <View style={styles.flexContainer}>
          <Icon name="calendar" size={20} color={colors.secondary} />
          <Text>{release_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    elevation: 10,
    borderRadius: 10,

    padding: 20,
  },

  imageContainer: {
    width: '100%',
    height: 180,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  title: {
    flex: 1,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.dark,
    marginTop: 20,
  },

  flexContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default memo(
  MovieCard,
  (prevProps, nextProps) => prevProps === nextProps,
);
