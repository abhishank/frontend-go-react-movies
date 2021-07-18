import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
export default class OneMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null,
    };

    componentDidMount() {
        let movieId = this.props.match.params.id
        fetch("http://localhost:4000/v1/movie/" + movieId)
            .then(response => {
                console.log("status code is:", response.status)
                if (response.status !== "200") {
                    let err = Error
                    err.message = "Invalid response code: " + response.status
                    this.setState({ error: err })
                }
                return response.json();
            })
            .then((json) => {
                this.setState({
                    movie: json.movie,
                    isLoaded: true,
                },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    }
                )
            })
    }

    render() {
        const { movie, isLoaded, error } = this.state;

        // if (movie.genres) {
        //     {Object.entries(movie.genres).forEach(
        //         ([id,genre])=>{
        //             movie.genres[id] = genre
        //         }
        //     )}
        //     // movie.genres = Object.values(movie.genres);
        // } else {
        //     movie.genres = []
        // }

        if (error) {
            return (<div>Error: {error.message}</div>)
        } else if (!isLoaded) {
            return (<p>Loading ...</p>)
        } else {
            return (
                <Fragment>
                    <h2>Movie:{movie.title} {movie.year}</h2>
                    <div className="float-start">
                        <small>MPAA Rating: {movie.mpaa_rating}</small>
                    </div>
                    <div className="float-end">
                        {Object.keys(movie.genres).map((key, index) => (
                            <span className="badge bg-secondary me-1" key={key}>
                                <Link to={`/genre/${key}/${movie.genres[key]}`}>{movie.genres[key]}</Link>
                            </span>
                        ))}
                    </div>


                    <div className="clearfix"></div>
                    <hr />

                    <table className="table table-compact table-striped">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td><strong>Title:</strong></td>
                                <td>{movie.title}</td>
                            </tr>
                            <tr>
                                <td><strong>Description:</strong></td>
                                <td>{movie.description}</td>
                            </tr>
                            <tr>
                                <td><strong>Relese Date:</strong></td>
                                <td>{movie.relese_date}</td>
                            </tr>
                            <tr>
                                <td><strong>Rating:</strong></td>
                                <td>{movie.rating}</td>
                            </tr>
                            <tr>
                                <td><strong>Genre:</strong></td>
                                <td>{Object.values(movie.genres)}</td>
                            </tr>
                            <tr>
                                <td><strong>Run Time:</strong></td>
                                <td>{movie.runtime}</td>
                            </tr>
                        </tbody>
                    </table>
                </Fragment>
            );
        }
    }
}