/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import {useGetMovieData, useGetMovieImages, useGetSamilarMovie} from 'hooks';
import {Movie} from 'types/types';

import colors from 'libs/colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const imageUrl = 'https://image.tmdb.org/t/p/w500';

interface DetailsPropsInterface {
  route: any;
  navigation: any;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Details({route, navigation}: DetailsPropsInterface) {
  const id = route.params.id;

  const {width} = useWindowDimensions();

  const {data: movie, isFetched: movieFetched} = useGetMovieData(id);
  const {data: images, isFetched: imageFetched} = useGetMovieImages(id);
  const {data: samilar, isFetched: samilarFetched} = useGetSamilarMovie(id);

  useLayoutEffect(() => {
    if (movieFetched) {
      navigation.setOptions({
        headerTitle: movie?.title,
      });
    }
  }, [navigation, movieFetched, movie?.title]);

  const ratingStars = (data: number) => {
    const rating = [];

    for (let i = 0; i < 5; i++) {
      if (i <= Math.floor(data / 2)) {
        rating.push({id: i + 1, name: 'star'});
      } else {
        rating.push({id: i + 1, name: 'star-o'});
      }
    }

    return (
      <View style={[styles.flexRowContainer, {gap: 5}]}>
        {rating.map((item, index) => (
          <FontAwesome
            name={item.name}
            key={index}
            size={18}
            color={item.name === 'star' ? 'gold' : colors.dark}
          />
        ))}
      </View>
    );
  };

  const formatMonth = (data: string, color: string) => {
    const date = new Date(data);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const formatString = `${day < 10 ? `0${day}` : day} ${
      months[month]
    } ${year}`;

    if (data.length > 0) {
      return (
        <Text style={[styles.additionalDesc, {color}]}>{formatString}</Text>
      );
    }

    return <Text style={[styles.additionalDesc, {color}]}>No Data</Text>;
  };

  if (movie) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={{uri: imageUrl + movie.poster_path}}
            style={styles.image}
          />
        </View>

        <View style={styles.innerContainer}>
          <View>
            <Text style={styles.title}>{movie.title}</Text>
          </View>

          <View>
            <Text style={styles.content}>{movie.overview}</Text>
          </View>

          <View style={{rowGap: 20, marginTop: 20}}>
            <View>
              <Text style={styles.subTitle}>Genre</Text>
              <View style={[styles.flexWrap, {gap: 5}]}>
                {movie.genres &&
                  movie.genres.map(item => (
                    <Text style={styles.subDesc} key={item.id}>
                      {item.name},
                    </Text>
                  ))}
              </View>
            </View>

            <View>
              <Text style={styles.subTitle}>Ratings</Text>
              {ratingStars(Math.floor(movie.vote_average))}
            </View>

            <View>
              <Text style={styles.subTitle}>Runtime</Text>
              <Text style={styles.subDesc}>{movie.runtime} mins</Text>
            </View>
          </View>

          <View style={{marginTop: 20, rowGap: 20}}>
            <Text style={[styles.subTitle, {textDecorationLine: 'underline'}]}>
              Additional Details
            </Text>

            <View>
              <Text style={styles.subTitle}>Release Date</Text>
              <Text style={styles.subDesc}>
                {formatMonth(movie.release_date, colors.dark)}
              </Text>
            </View>

            <View>
              <Text style={styles.subTitle}>Back Drops</Text>
              {imageFetched && images && images.length === 0 && (
                <Text>Data not found</Text>
              )}
              {imageFetched && images && images.length > 0 && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{padding: 20}}
                  snapToAlignment="center">
                  {images.map((item: any, index: number) => {
                    return (
                      <View
                        style={{
                          width: width > 800 ? 500 : width - 100,
                          height: width > 800 ? width / 3 : width - 200,
                          marginRight: 20,
                        }}
                        key={index}>
                        <Image
                          source={{uri: imageUrl + item.file_path}}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>

            <View>
              <Text style={styles.subTitle}>Samilar Movies</Text>
              {samilarFetched && samilar && samilar.length === 0 && (
                <Text>Data not found</Text>
              )}
              {samilarFetched && samilar && samilar.length > 0 && (
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{padding: 20}}
                  snapToAlignment="center">
                  {samilar.map((item: Movie, index: number) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.samilarMovieContainer,
                          {
                            width:
                              width > 800
                                ? 500
                                : width < 500
                                ? width - 100
                                : 500,
                            height:
                              width > 800
                                ? width / 3
                                : width < 500
                                ? width
                                : 500,
                          },
                        ]}
                        key={index}
                        onPress={() =>
                          navigation.navigate('Details', {id: item.id})
                        }>
                        <Image
                          source={{
                            uri: imageUrl + item.poster_path,
                          }}
                          style={{
                            width: '100%',
                            height: '70%',
                            objectFit: 'contain',
                          }}
                        />
                        <Text
                          style={[
                            styles.additionalTitle,
                            {textAlign: 'center', color: colors.white},
                          ]}>
                          {item.title}
                        </Text>
                        <View style={styles.flexRowContainer}>
                          <FontAwesome
                            name="calendar"
                            color={colors.white}
                            size={20}
                          />
                          {formatMonth(item.release_date, colors.white)}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    backgroundColor: colors.secondary,
  },

  image: {
    width: '100%',
    height: 400,
    objectFit: 'contain',
  },

  content: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  innerContainer: {
    flex: 1,
    backgroundColor: colors.light,
    gap: 10,
    padding: 20,
  },

  flexRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  flexWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: colors.dark,
  },

  subTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.dark,
  },

  subDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.dark,
  },

  additionalTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.dark,
  },

  additionalDesc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.dark,
  },

  logo: {
    width: 50,
    height: 50,
    objectFit: 'contain',
  },

  samilarMovieContainer: {
    marginRight: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    gap: 10,
    padding: 20,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
