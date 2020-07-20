import React from "react";
import Image from "react-graceful-image";


class MovieItem extends React.Component {
    constructor() {
        super();

        this.state = {
            willWtch: false
        };
    }

    // componentWillUnmount() {
    //     // console.log("unmount", this.props.movie.title);
    // }

    render() {
        const { movie, removeMovie, addMovieToWillWatch, removeMovieFromWillWatch } = this.props;

        return (
            <div className="card">
                <Image
                    className="card-img-top"
                    src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : "placeholder.svg"}
                    width="395"
                    height="222"
                    alt={movie.title}
                />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Rating: {movie.vote_average}</p>
                        {this.state.willWatch ? (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.setState({
                                        willWatch: false
                                    });
                                    removeMovieFromWillWatch(movie)
                                }}
                            >
                                Remove Will Watch
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        this.setState({
                                            willWatch: true
                                        });
                                        addMovieToWillWatch(movie)
                                    }}
                                >
                                    Add Will Watch
                                </button>
                            )}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={removeMovie.bind(null, movie)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieItem;