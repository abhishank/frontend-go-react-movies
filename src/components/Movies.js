import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Movies extends Component {

    state = {
        movies: [],
        isloaded: false,
        error: null,
    };

    componentDidMount() {
        fetch("http://localhost:4000/v1/movies/")
            // .then((response) => response.json())
            .then((response) => {
                console.log("status code is:", response.status);
                if (response.status !== "200") {
                    let err = Error
                    err.message = "Invalid response code: " + response.status
                    this.setState({ error: err })
                }
                return response.json();
            })
            .then((json) => {
                this.setState({
                    movies: json.movies,
                    isloaded: true,
                },
                    (error) => {
                        this.setState({
                            isloaded: true,
                            error
                        })
                    }
                )
            })
    }

    render() {
        const { movies, isloaded, error } = this.state;
        if (error) {
            return (<div>Error: {error.message}</div>)
        } else if (!isloaded) {
            return (<p>Loading ...</p>)
        } else {
            return (
                <Fragment>
                    <h2>Choose a Movie</h2>
                    <ul>
                        {movies.map((i) => (
                            <li key={i.id}>
                                <Link to={`/movies/${i.id}`}> {i.title} </Link>
                            </li>
                        ))}
                    </ul>
                </Fragment>
            );
        }
    }
}