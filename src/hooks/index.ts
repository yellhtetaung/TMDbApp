import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {Genres, Movie} from 'types/types';

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDg1OGYxMWZkNTg1NDk2YzU0NTkxZGIzMzJjYzVhNiIsInN1YiI6IjY1ZjZlMDI2NTkwN2RlMDE2M2U1ZjY0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gLfJNslD6gBWPGq7JnM57E4p0sdIMaA4etJzaGwk29s',
  },
};

const api_key = 'f0858f11fd585496c54591db332cc5a6';

const getPopularMovies = async (page: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      options,
    );
    const data = await response.json();

    return {result: data.results, page: data.page + 1};
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const usePopularMovies = () => {
  const {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['popular'],
    queryFn: ({pageParam}) => getPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: ({page}) => page,
  });

  return {
    data,
    isError,
    isLoading,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};

const getMovieById = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options,
    );
    const data = await response.json();

    return data as Movie;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
const getImages = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options,
    );

    const data = await response.json();

    return data.backdrops;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const getSamilarMovies = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options,
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const useGetMovieData = (id: number) => {
  const {data, isError, isFetched} = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieById(id),
    enabled: id !== undefined,
  });

  return {data, isError, isFetched};
};

export const useGetMovieImages = (id: number) => {
  const {data, isError, isFetched} = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImages(id),
    enabled: id !== undefined,
  });

  return {data, isError, isFetched};
};

export const useGetSamilarMovie = (id: number) => {
  const {data, isError, isFetched} = useQuery({
    queryKey: ['samilar', id],
    queryFn: () => getSamilarMovies(id),
    enabled: id !== undefined,
  });

  return {data, isError, isFetched};
};

const searchBy = async (value: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${value}`,
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const useSearchBy = (value: string) => {
  const {data, isError, isFetched, isFetching} = useQuery({
    queryKey: ['search', value],
    queryFn: () => searchBy(value),
    enabled: value !== undefined,
  });

  return {
    data,
    isError,
    isFetched,
    isFetching,
  };
};

const getGenreList = async () => {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=en',
      options,
    );
    const data = await response.json();

    return data.genres as Genres[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const useGetGenreList = () => {
  const {data, isError, isFetched} = useQuery({
    queryKey: ['genres'],
    queryFn: getGenreList,
  });

  return {data, isError, isFetched};
};

const searchByGenre = async (value: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${value}`,
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const useSearchByGenre = (value: string) => {
  const {data, isError, isFetched, isFetching} = useQuery({
    queryKey: ['search', value],
    queryFn: () => searchByGenre(value),
    enabled: value !== undefined,
  });

  return {
    data,
    isError,
    isFetched,
    isFetching,
  };
};
