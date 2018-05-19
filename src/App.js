import React, { Component } from "react";
import "./App.css";

let defaultStyle = {
  color: "#fff"
};
let fakeServerData = {
  user: {
    name: "Bookmon",
    playlists: [
      {
        name: "Move",
        songs: [
          { name: "The Big Beat", duration: 12345 },
          { name: "Sweet", duration: 12361 },
          { name: "Collard Greens", duration: 70000 }
        ]
      },
      {
        name: "Move2",
        songs: [
          { name: "Living Proof", duration: 12375 },
          { name: "Here Come The Lords", duration: 23456 },
          { name: "Contact Blitt", duration: 80000 }
        ]
      },
      {
        name: "AcidJazz",
        songs: [
          { name: "Friends and Strangers", duration: 12345 },
          { name: "Los Conquistadores Chocolate", duration: 36912 },
          { name: "Wind Parade", duration: 70000 }
        ]
      },
      {
        name: "Platinum Kings",
        songs: [
          { name: "White Collar Criminal", duration: 3621 },
          { name: "I dont Know Why", duration: 9121 },
          { name: "Legalize It", duration: 36912 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{Math.round(totalDuration / 60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={{ defaultStyle }}>
        <img />
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlistEle = this.props.playlist;
    return (
      <div
        style={{
          ...defaultStyle,
          listStyleType: "none",
          display: "inline-block",
          width: "25%"
        }}
      >
        <img />
        <h3>{this.props.playlist.name}</h3>
        <ul style={{ listStyleType: "none" }}>
          {this.props.playlist.songs.map(song => <li>{song.name}</li>)}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData });
    }, 5000);

    setTimeout(() => {
      this.setState({ filterString: '' });
    }, 2000);
  }
  render() {
    let name = "Jason Black";
    let playlistToRender = this.state.serverData.user ? this.state.serverData.user.playlists
      .filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, "font-size": "54" }}>
              {this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists={playlistToRender} />
            <HoursCounter playlists={playlistToRender} />
            <Filter onTextChange={text => {
              console.log(text);
              this.setState({filterString: text})}}/>
            {playlistToRender.map(playlist =>
              <Playlist playlist={playlist} />
            )}
          </div>
        ) : (
          <h1 style={defaultStyle}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
