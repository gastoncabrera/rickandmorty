import React from "react";
import Logo from "../Images/logo.png";
import "../style/app.css";
import Github from "../Images/github (1).svg";
import Like from "../Images/heart-fill.svg";
import Twitter from "../Images/twitter (1).svg";
import Netlify from "../Images/netlifylogo.jpg";
import StatusColor from "../pages/statusColor.js";
import Loader from "./Loader";
import SvgImage from "./svgImage";

class App extends React.Component {
  state = {
    nextPage: 1,
    data3: {
      info: [],
      results: [],
    },
    data2: {
      info: [],
    },
    data: {
      info: [],
      results: [],
    },
  };
  componentDidMount() {
    this.fetchCharacters();
    this.fetchLocations();
    this.fetchEpisodes();
  }
  fetchCharacters = async () => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${this.state.nextPage}`
    );
    const data = await response.json();
    console.log(data);

    this.setState({
      loading: false,
      data: {
        info: data.info,
        results: [].concat(this.state.data.results, data.results),
      },
      nextPage: this.state.nextPage + 1,
    });
  };
  fetchLocations = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/location");
    const data2 = await response.json();

    this.setState({
      data2: data2,
    });
  };
  fetchEpisodes = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/episode");
    const data3 = await response.json();
    console.log(data3);

    this.setState({
      data3: data3,
    });
  };
  render() {
    return (
      <div>
        <section className="header">
          <div className="header_img-logo">
            <a href="/">
              <img src={Logo}></img>
            </a>
          </div>
          <div className="header_container-links">
            <a href="documentation">Docs</a>
            <a href="About">About</a>
            <div className="header_container-links-button">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width=".8rem"
                  height=".8rem"
                  fill="white"
                  class="bi bi-suit-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                </svg>
              </a>
              <div className="btn-help-us">
                <a href="help-us">HELP US</a>
              </div>
            </div>
          </div>
        </section>
        <section className="hero">
          <div className="hero_title">
            <h1>The Rick and Morty API</h1>
          </div>
        </section>
        <section className="container_character">
          <div className="container_card-image">
            {this.state.data.results.map((props) => (
              <li key={props.id}>
                <article className="container_card-API">
                  <div className="container_box-image">
                    <img src={props.image} alt={props.name}></img>
                  </div>
                  <div className="container_box-description">
                    <div className="box_name-status">
                      <a
                        className="name"
                        href={`https://rickandmortyapi.com/api/character/${props.id}`}
                      >
                        <h2>{props.name}</h2>
                      </a>
                      <h4>
                        <StatusColor status={props.status} />
                        {props.status}-{props.species}
                      </h4>
                    </div>
                    <div className="box_location">
                      <p>Last known location:</p>
                      <a
                        href={`https://rickandmortyapi.com/api/location/${props.id}`}
                      >
                        {props.location.name}
                      </a>
                    </div>
                    <div className="box_first-seen">
                      <p>First seen in:</p>
                    </div>
                  </div>
                </article>
              </li>
            ))}

            <img src={""} id="characterImg"></img>
          </div>
        </section>
        {!this.state.loading && (
          <button
            className="btn-primary"
            onClick={() => this.fetchCharacters()}
          >
            Load More
          </button>
        )}
        <section className="container_footer">
          <div className="footer">
            <div className="content_links-API">
              <a href="">CHARACTERS: {this.state.data.info.count}</a>
              <a href="">LOCATIONS: {this.state.data2.info.count}</a>
              <a href="">EPISODES: {this.state.data3.info.count}</a>
            </div>
            <div className="content_link-server">
              <a href="">SERVER STATUS</a>
            </div>
            <div className="content_liks">
              <SvgImage />
            </div>
            <div className="netlify">
              <img src={Netlify} alt=""></img>
            </div>
            <div className="creator-container">
              <span className="creator">
                ❮❯ by <a href="">Cabrera Gaston</a> 2021
              </span>
            </div>
          </div>
        </section>
        <ul>
          {this.state.loading && (
            <div className="loader">
              <Loader />
            </div>
          )}
        </ul>
      </div>
    );
  }
}
export default App;
