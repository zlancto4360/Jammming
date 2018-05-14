import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return(
      <div className="TrackList">
        {this.props.tracklist.map(track => {
          return <Track onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}
                        track={track}
                        key={track.id} />
                      }
                    )
        }
      </div>
    );
  }
}

export default TrackList;
