/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {usePopularMovies} from 'hooks';
import MovieCard from 'components/MovieCard';
import Separator from 'components/Separator';
import {PopularMovies} from 'types/types';

interface HomePorps {
  navigation: any;
}

const Home: React.FC<HomePorps> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const {data, fetchNextPage, hasNextPage, isError, error} = usePopularMovies();

  const movies = data?.pages.flatMap(page => page.result);

  const loadMores = () => hasNextPage && fetchNextPage();

  return (
    <View style={styles.container}>
      {isError && (
        <Text style={styles.error}>
          {error instanceof Error ? error.message : 'Something went wrong'}.
        </Text>
      )}

      <FlashList
        data={movies}
        renderItem={({item}: {item: PopularMovies}) => (
          <MovieCard
            style={{width: width > 600 ? '95%' : '100%'}}
            {...item}
            onPress={() => navigation.navigate('Details', {id: item.id})}
          />
        )}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={Separator}
        onEndReached={loadMores}
        estimatedItemSize={190 * 15}
        numColumns={width > 600 ? 2 : 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
  },

  landscapeContainer: {
    justifyContent: 'space-around',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    color: '#ffe742',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default Home;
