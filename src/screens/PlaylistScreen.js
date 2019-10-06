import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import {playbackStates} from '../constants';

import Player from '../components/Player';
import playlistData from '../data/playlist.json';
import localTrack from '../resources/pure.mp4';

export default function PlaylistScreen() {
  const playbackState = usePlaybackState();
  console.log('TCL: PlaylistScreen -> playbackState', playbackState);

  useEffect(() => {
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
    });
  }, []);

  async function togglePlayback() {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      console.log('TCL: togglePlayback -> currentTrack', currentTrack);
      if (currentTrack === undefined) {
        await TrackPlayer.reset();
        await TrackPlayer.add(playlistData);
        await TrackPlayer.add({
          id: 'local-track',
          url: localTrack,
          title: 'Pure (Demo)',
          artist: 'David Chavez',
          artwork: 'https://picsum.photos/200',
        });
        await TrackPlayer.play();
      } else {
        if (playbackState === playbackStates.PAUSED) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      }
    } catch (error) {
      console.log({error});
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        We'll be inserting a playlist into the library loaded from
        `playlist.json`. We'll also be using the `ProgressComponent` which
        allows us to track playback time.
      </Text>
      <Player
        onNext={skipToNext}
        style={styles.player}
        onPrevious={skipToPrevious}
        onTogglePlayback={togglePlayback}
      />
      <Text style={styles.state}>{getStateName(playbackState)}</Text>
    </View>
  );
}

PlaylistScreen.navigationOptions = {
  title: 'Playlist Example',
};

function getStateName(state) {
  switch (state) {
    case playbackStates.IDLE:
      return 'idle';
    case playbackStates.PLAYING:
      return 'Playing';
    case playbackStates.PAUSED:
      return 'Paused';
    case playbackStates.BUFFERING:
      return 'Buffering';
    default:
      return 'idle';
  }
}

async function skipToNext() {
  try {
    await TrackPlayer.skipToNext();
  } catch (_) {}
}

async function skipToPrevious() {
  try {
    await TrackPlayer.skipToPrevious();
  } catch (_) {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  description: {
    width: '80%',
    marginTop: 20,
    textAlign: 'center',
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});
