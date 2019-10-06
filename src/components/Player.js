import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TrackPlayer, {
  TrackPlayerEventTypes,
  usePlaybackState,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import {playbackStates} from '../constants';

function ControlButton({title, onPress}) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default function Player(props) {
  console.log('here', TrackPlayerEventTypes);
  const playbackState = usePlaybackState();
  const [trackArt, setTrackArt] = useState({
    title: '',
    artist: '',
    artwork: '',
  });
  useTrackPlayerEvents(['playback-track-changed'], async event => {
    if (event.type === 'playback-track-changed') {
      const {title, artist, artwork} = await TrackPlayer.getTrack(
        event.nextTrack,
      );
      setTrackArt({title, artist, artwork});
    }
  });

  const {style, onNext, onPrevious, onTogglePlayback} = props;
  const isPlayingOrBuffering =
    playbackState === playbackStates.PLAYING ||
    playbackState === playbackStates.BUFFERING;

  return (
    <View style={[styles.card, style]}>
      <Image style={styles.cover} source={{uri: trackArt.artwork}} />
      <Text style={styles.title}>{trackArt.title}</Text>
      <Text style={styles.artist}>{trackArt.artist}</Text>
      <View style={styles.controls}>
        <ControlButton title={'<<'} onPress={onPrevious} />
        <ControlButton
          title={isPlayingOrBuffering ? 'Pause' : 'Play'}
          onPress={onTogglePlayback}
        />
        <ControlButton title={'>>'} onPress={onNext} />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 1},
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
