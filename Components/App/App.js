import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
     searchResults: [],
     playlistName: 'New PlayList',
     playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let tracks =
       [...this.state.playlistTracks];
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let tracks =
    [...this.state.playlistTracks];
    const newTracks = tracks.filter(playlistTrack => track.id !== playlistTrack.id);
    this.setState({playlistTracks: newTracks});
    }


  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist(){
      const tracklist = this.state.playlistTracks.map(track => track.uri);
      const listName = this.state.playlistName;
      Spotify.savePlaylist(listName, tracklist)
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      }
    )
  }

  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults= {this.state.searchResults} />
            <Playlist
              onSave={this.savePlaylist}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
