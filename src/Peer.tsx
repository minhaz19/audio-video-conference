/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {HMSTrackSource, HMSVideoViewMode} from '@100mslive/react-native-hms';
import {SCREEN_WIDTH} from './constants/windowSize';
import Colors from './constants/Colors';
import DescriptionText from './constants/DescriptionText';
import BigText from './constants/BigText';
import Text_Size from './constants/textScaling';

interface Props {
  item: any;
  HmsView: any;
}
const Peer = ({item, HmsView}: Props) => {
  const {peer, track} = item;
  return (
    <View
      style={{
        height: SCREEN_WIDTH <= 380 ? 200 : SCREEN_WIDTH <= 600 ? 250 : 300,
        margin: 8,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: Colors.dark.borderColor,
      }}>
      <View style={styles.peerNameContainer}>
        <DescriptionText
          text={`${peer.name} ${peer.isLocal ? '(You)' : ''}`}
          textStyle={styles.peerName}
        />
      </View>
      {HmsView &&
      track &&
      peer?.videoTrack?.trackId &&
      !peer?.videoTrack.isMute() ? (
        <HmsView
          mirror={peer.isLocal}
          trackId={peer?.videoTrack?.trackId!}
          scaleType={
            track?.source !== undefined &&
            track?.source !== HMSTrackSource.REGULAR
              ? HMSVideoViewMode.ASPECT_FIT
              : HMSVideoViewMode.ASPECT_FILL
          }
          style={{width: '100%', height: '100%'}}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.primary,
            }}>
            <BigText
              textStyle={{
                textAlign: 'center',
                fontSize: Text_Size.Text_7,
                fontWeight: 'bold',
                color: Colors.light.background,
                textTransform: 'uppercase',
              }}
              text={peer.name
                .split(' ')
                .map((items: any[]) => items[0])
                .join('')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Peer;

const styles = StyleSheet.create({
  peerNameContainer: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: Colors.light.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    zIndex: 1,
    color: 'white',
  },
  peerName: {
    color: Colors.light.background,
  },
});
