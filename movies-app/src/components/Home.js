import React, { useState, useEffect } from "react";
import {
  API_URL,
  API_KEY,
  API_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE
} from "../config";

//import components
import HeroImage from "./elements/HeroImage";
import SearchBar from "./elements/SearchBar";
import Grid from "./elements/Grid";
import MovieThumb from "./elements/MovieThumb";
import LoadMoreBtn from "./elements/LoadMoreBtn";
import Spinner from "./elements/Spinner";

const Home = () => {
  const [state, setState] = useState({ movies: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(state);

  const fetchMovies = async endpoint => {
    setError(false);
    setLoading(true);

    try {
      const res = await (await fetch(endpoint)).json();
      //console.log(res);
      setState(prev => ({
        ...prev,
        moveis: [...res.results],
        HeroImage: prev.HeroImage || res.results[0],
        currentPage: res.page,
        totalPages: res.total_pages
      }));
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`);
  }, []);

  return (
    <>
      <HeroImage />
      <SearchBar />
      <Grid />
      <MovieThumb />
      <LoadMoreBtn />
      <Spinner />
    </>
  );
};

export default Home;
