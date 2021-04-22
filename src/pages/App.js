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
        <div className="header">
          <div className="header_img-logo">
            <a href="/">
              <img src={Logo}></img>
            </a>
          </div>
          <div className="header_container-links">
            <a href="documentation">Docs</a>
            <a href="About">About</a>
            <div className="header_container-links-button">
              <a href="help-us">HELP US</a>
            </div>
          </div>
        </div>
        <div className="hero">
          <div className="Hero_title">
            <h1>The Rick and Morty API</h1>
          </div>
        </div>
        <div className="container_character">
          <div className="container_character-card">
            <div className="container_card-image">
              {this.state.data.results.map((props) => (
                <li key={props.id}>
                  <div className="container_card-API">
                    <div className="container_box-image">
                      <img src={props.image} alt={props.name}></img>
                      <div className="container_box-descriptions">
                        <a
                          className="Name"
                          href={`https://rickandmortyapi.com/api/character/${props.id}`}
                        >
                          {props.name}
                        </a>
                        <h4>
                          <StatusColor status={props.status} />
                          {props.status}-{props.species}
                        </h4>
                        <p>Last known location:</p>
                        <a
                          className="Location"
                          href={`https://rickandmortyapi.com/api/location/${props.id}`}
                        >
                          {props.location.name}
                        </a>
                        <p>First seen in:</p>
                        <ul>
                          {this.state.loading && (
                            <div className="loader">
                              <Loader />
                            </div>
                          )}
                        </ul>
                        {/* <div>
                    {this.state.data3.results.map(props=>(
                      <li className="prueba" key={props.id}>
                      <a >{props.name}
                      </a>
                      </li>))}
                    </div> */}
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              <img src={""} id="characterImg" height="200"></img>
            </div>
            <div className="container_card-description"></div>
          </div>
        </div>
        {!this.state.loading && (
          <button
            className="btn-primary"
            onClick={() => this.fetchCharacters()}
          >
            Load More
          </button>
        )}
        <div className="footer">
          <div>
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
            <div className="creator">
              <span>
                ❮❯ by <a href="">Cabrera Gaston</a> 2021
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
