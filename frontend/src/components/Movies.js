import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"

export default class Movies extends Component {
  state = {
    movies: [],
    isLoaded: false,
    error: null,
  }

  async componentDidMount() {
    try {
      const resp = await fetch("http://localhost:4000/v1/movies")

      if (resp.status !== 200) {
        this.setState({
          error: `Invalid response code: ${resp.status}`,
          isLoaded: true,
        })
        return
      }

      const data = await resp.json()
      console.log({ data })
      this.setState({ movies: data.movies, isLoaded: true })
    } catch (error) {
      console.log({ error })
      this.setState({ error: error.message, isLoaded: true })
    }
  }

  render() {
    const { movies, isLoaded, error } = this.state

    console.log({ movies })

    if (error) {
      return <p>{error}</p>
    }

    if (!isLoaded) {
      return <p>Loading...</p>
    }
    return (
      <Fragment>
        <h2>Choose a movie</h2>

        <div className="list-group">
          {movies.map((m) => (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={`/movies/${m.id}`}
            >
              {m.title}
            </Link>
          ))}
        </div>
      </Fragment>
    )
  }
}
