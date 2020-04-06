import React from "react";
// import { moviesData } from '../moviesData';
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import MoviePages from './MoviePages'
import { API_URL, API_KEY_3 } from "../utils/api";

// UI = fn(state, props)

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      movieWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      total_pages: 1
    };
    // console.log("constructor");
  }

  componentDidMount() {
    // console.log("didMount");
    this.getMovies();
    // console.log("after then");
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("didUpdate");
    // console.log("prev", prevProps, prevState);
    // console.log("prev", this.props, this.state);

    if (prevState.sort_by !== this.state.sort_by || prevState.page !== this.state.page) {
      // console.log("call api");
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log("data", data);
        this.setState({
          movies: data.results,
          total_pages: data.total_pages
        });
      });
  };

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function (item) {
      return item.id !== movie.id;
    });

    this.setState({
      movies: updateMovies,
    });
  };

  addMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.movieWillWatch, movie];
    // updateMoviesWillWatch.push(movie);

    this.setState({
      movieWillWatch: updateMoviesWillWatch,
    });
  };

  removeMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.movieWillWatch.filter(function (
      item
    ) {
      return item.id !== movie.id;
    });

    this.setState({
      movieWillWatch: updateMoviesWillWatch,
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
      page: 1
    });
  };

  updatePage = (value) => {
    this.setState({
      page: value,
    });
  };

  render() {
    // console.log("render", this.state.total_pages);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <MoviePages
              page={this.state.page}
              total_pages={this.state.total_pages}
              updatePage={this.updatePage}
            />
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
            <MoviePages
              page={this.state.page}
              total_pages={this.state.total_pages}
              updatePage={this.updatePage}
            />
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.movieWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.movieWillWatch.map((movie) => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
