import React, { Component, Fragment } from "react"

export default class OneMovie extends Component {
  state = { movie: {}, isLoaded: false, error: null }

  async componentDidMount() {
    try {
      const resp = await fetch(
        "http://localhost:4000/v1/movie/" + this.props.match.params.id,
      )

      if (resp.status !== 200) {
        this.setState({
          error: `Invalid response code: ${resp.status}`,
          isLoaded: true,
        })
        return
      }
      const data = await resp.json()
      this.setState({ movie: data.movie, isLoaded: true })
    } catch (error) {
      console.log({ error })
      this.setState({ error: error.message, isLoaded: true })
    }
  }

  render() {
    const { movie, isLoaded, error } = this.state
    console.log({ movie })
    if (movie.genres) {
      movie.genres = Object.values(movie.genres)
    } else {
      movie.genres = []
    }

    if (error) {
      return <p>{error}</p>
    }

    if (!isLoaded) {
      return <p>Loading...</p>
    }
    return (
      <Fragment>
        <h2>
          Movie: {movie.title} ({movie.year})
        </h2>

        <div className="float-start">
          <small>Rating: {movie.mpaa_rating}</small>
        </div>
        <div className="float-end">
          {movie.genres.map((g, idx) => (
            <span className="badge bg-secondary" key={idx}>
              {g}
            </span>
          ))}
        </div>
        <div className="clearfix"></div>
        <hr />

        <table className="table table-compact table-striped">
          <thead></thead>
          <tbody>
            <tr>
              <td>
                <strong>Title:</strong>
              </td>
              <td>{movie.title}</td>
            </tr>
            <tr>
              <td>
                <strong>Description:</strong>
              </td>
              <td>{movie.description}</td>
            </tr>
            <tr>
              <td>
                <strong>Run time:</strong>
              </td>
              <td>{movie.runtime} minutes</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    )
  }
}
