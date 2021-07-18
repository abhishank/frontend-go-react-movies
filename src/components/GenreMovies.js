import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

export default class GenreMovies extends Component {

    state = {
        movies: [],
        isLoaded: false,
        error: null
    }

    componentDidMount() {
        this.genreName = this.props.match.params.genreName
        console.log(this.genreName);
        this.genreId = this.props.match.params.id
        fetch("http://localhost:4000/v1/genre/" + this.genreId)
            .then((response) => {
                if (response.status !== "200") {
                    let err = Error
                    err.message = "Invalid response status: " + response.status
                    this.setState({ error: err })
                }
                return response.json()
            })
            .then(json => {
                let movies = []
                if(json.movies){
                    movies = json.movies
                }
                this.setState({
                    movies: movies,
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
        const { movies, isLoaded, error } = this.state;

        if (error) {
            return (<div>Error: {error.message}</div>)
        } else if (!isLoaded) {
            return (<p>Loading ...</p>)
        } else {
            return (
                <Fragment>
                    <h2>{this.genreName} Genre Movies </h2>

                    <ul>
                        {movies.map((m) => (
                            <li key={m.id}>
                                <Link to={`/movies/${m.id}`}>
                                    {m.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            )
        }
    }
}