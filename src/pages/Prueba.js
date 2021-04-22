import React from "react";
import "../style/Prueba.css";
import Loader from "../pages/Loader";
import StatusColor from "../pages/statusColor";

class Prueba extends React.Component {
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
      </div>
    );
  }
}
export default Prueba;
