import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import MovieCard from 'components/MovieCard';
import Separator from 'components/Separator';

import {PopularMovies} from 'types/types';
import {useSearchBy, useGetGenreList, useSearchByGenre} from '../hooks';
import colors from 'libs/colors';

interface SearchProps {
  navigation: any;
}

export default function Search({navigation}: SearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [genreValue, setGenreValue] = useState('');
  const [movies, setMovies] = useState<PopularMovies[]>([]);

  const {width} = useWindowDimensions();

  const {data, isFetched, isError, isFetching} = useSearchBy(inputValue);
  const {data: genres, isFetched: genresIsFetched} = useGetGenreList();
  const {
    data: movieByGenre,
    isFetched: movieByGenreFetched,
    isError: movieByGenreError,
    isFetching: movieByGenreFetching,
  } = useSearchByGenre(genreValue);

  useEffect(() => {
    if (isFetched && data && !isError) {
      setMovies(data);
    }
  }, [isFetched, data, isError]);

  useEffect(() => {
    if (movieByGenreFetched && movieByGenre && !movieByGenreError) {
      setMovies(movieByGenre);
    }
  }, [movieByGenre, movieByGenreFetched, movieByGenreError]);

  const headerInput = useCallback(
    () => (
      <TextInput
        value={inputValue}
        onChangeText={text => {
          setGenreValue('');
          setInputValue(text);
        }}
        style={styles.input}
        placeholder="Search title ..."
        placeholderTextColor={colors.white}
        autoFocus
      />
    ),
    [inputValue],
  );

  useLayoutEffect(() => {
    if (movieByGenreFetched) {
      navigation.setOptions({
        headerTitle: headerInput,
      });
    }
  }, [headerInput, movieByGenreFetched, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {genresIsFetched && genres && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tagContentContainer}>
              {genres.length > 0 &&
                genres.map(genre => (
                  <TouchableOpacity
                    key={genre.id}
                    style={styles.tag}
                    onPress={() => {
                      setGenreValue(genre.id.toString());
                      setInputValue('');
                    }}>
                    <Text style={styles.tagTitle}>{genre.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        )}
      </View>

      {isError && <Text>Something Wrong</Text>}

      {isFetching && movieByGenreFetching && (
        <ActivityIndicator size={'large'} />
      )}

      {movies && (
        <FlashList
          data={movies}
          renderItem={({item}: {item: PopularMovies}) => (
            <MovieCard
              {...item}
              onPress={() => navigation.navigate('Details', {id: item.id})}
            />
          )}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={Separator}
          estimatedItemSize={190 * 15}
          numColumns={width > 600 ? 2 : 1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
  },

  input: {
    fontSize: 18,
    color: colors.white,
    padding: 10,
    paddingHorizontal: 20,
  },

  tagContentContainer: {
    gap: 20,
  },

  tag: {
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tagTitle: {
    color: colors.white,
  },
});
