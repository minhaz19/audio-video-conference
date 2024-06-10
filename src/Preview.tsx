import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {
  HMSLocalPeer,
  HMSRoom,
  HMSTrack,
  HMSTrackSource,
  HMSTrackType,
  HMSVideoViewMode,
} from '@100mslive/react-native-hms';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from './constants/Colors';
import Text_Size from './constants/textScaling';
import { CustomButton } from './constants/CustomButton';

export const PreviewModal = ({
  room,
  previewTracks,
  join,
  setLoadingButtonState,
  loadingButtonState,
  hmsInstance,
  setIsAudioMute,
  isAudioMute,
  setIsVideoMute,
  isVideoMute,
}: {
  room?: HMSRoom;
  previewTracks: HMSTrack[];
  join: Function;
  setLoadingButtonState: React.Dispatch<React.SetStateAction<boolean>>;
  loadingButtonState: boolean;
  hmsInstance: any;
  setIsAudioMute: (arg: boolean) => void;
  isAudioMute: boolean | undefined;
  setIsVideoMute: (arg: boolean) => void;
  isVideoMute: boolean | undefined;
}) => {
  const { top, bottom, left, right } = useSafeAreaInsets();
  const [previewVideoTrack, setPreviewVideoTrack] = useState<HMSTrack>();

  const [previewPeer, setPreviewPeer] = useState<HMSLocalPeer>();

  const HmsView = hmsInstance?.HmsView;
  const audioAllowed =
    previewPeer?.role?.publishSettings?.allowed?.includes('audio');
  const videoAllowed =
    previewPeer?.role?.publishSettings?.allowed?.includes('video');

  useEffect(() => {
    hmsInstance
      ?.getLocalPeer()
      .then((localPeer: React.SetStateAction<HMSLocalPeer | undefined>) =>
        setPreviewPeer(localPeer),
      );
  }, [hmsInstance]);

  useEffect(() => {
    previewTracks.map(track => {
      if (
        track?.type === HMSTrackType.VIDEO &&
        track?.source === HMSTrackSource.REGULAR
      ) {
        setPreviewVideoTrack(track);
        setIsVideoMute(track?.isMute());
      }
      if (
        track?.type === HMSTrackType.AUDIO &&
        track?.source === HMSTrackSource.REGULAR
      ) {
        setIsAudioMute(track?.isMute());
      }
    });
  }, [previewTracks]);

  const getInitials = (name?: String): String => {
    let initials = '';
    if (name) {
      if (name.includes(' ')) {
        const nameArray = name.split(' ');
        if (nameArray[1].length > 0) {
          initials =
            nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1);
        } else {
          if (nameArray[0].length > 1) {
            initials = nameArray[0].substring(0, 2);
          } else {
            initials = nameArray[0].substring(0, 1);
          }
        }
      } else {
        if (name.length > 1) {
          initials = name.substring(0, 2);
        } else {
          initials = name.substring(0, 1);
        }
      }
    }
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {isVideoMute || !HmsView || !previewVideoTrack?.trackId ? (
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(previewPeer?.name)}
              </Text>
            </View>
            <Text style={styles.name}>{previewPeer?.name}</Text>
          </View>
        ) : (
          <HmsView
            scaleType={HMSVideoViewMode.ASPECT_FILL}
            style={styles.hmsView}
            trackId={previewVideoTrack?.trackId}
          />
        )}
      </View>
      <View style={[styles.textContainer, { top: 48 + top }]}>
        <Text style={styles.heading}>Configure Video and Audio</Text>
      </View>
      <View style={[styles.buttonRow, { bottom: 24 + bottom, left, right }]}>
        <View style={styles.iconContainer}>
          <View style={styles.iconSubContainer}>
            {/* {audioAllowed && ( */}
            <CustomButton
              onPress={() => {
                setIsAudioMute(!isAudioMute);
                previewPeer?.localAudioTrack()?.setMute(!isAudioMute);
              }}
              viewStyle={[
                styles.singleIconContainer,
                isAudioMute && styles.mute,
              ]}
              LeftIcon={
                <Feather
                  name={isAudioMute ? 'mic-off' : 'mic'}
                  style={[
                    styles.videoIcon,
                    isAudioMute && styles.muteVideoIcon,
                  ]}
                  size={32}
                />
              }
            />
            {/* )} */}
            {/* {videoAllowed && ( */}
            <CustomButton
              onPress={() => {
                setIsVideoMute(!isVideoMute);
                previewPeer?.localVideoTrack()?.setMute(!isVideoMute);
              }}
              viewStyle={[
                styles.singleIconContainer,
                isVideoMute && styles.mute,
              ]}
              LeftIcon={
                <Feather
                  name={isVideoMute ? 'video-off' : 'video'}
                  style={[
                    styles.videoIcon,
                    isVideoMute && styles.muteVideoIcon,
                  ]}
                  size={32}
                />
              }
            />
            {/* )} */}
          </View>
          <View style={styles.iconSubContainer}>
            {previewPeer && (
              <CustomButton
                onPress={() => { }}
                disabled={true}
                viewStyle={[
                  styles.singleIconContainer,
                  isAudioMute && styles.mute,
                ]}
                LeftIcon={
                  <Image
                    resizeMode="contain"
                    style={styles.image}
                    source={
                      previewPeer?.networkQuality?.downlinkQuality === 0
                        ? require('./assets/network_0.png')
                        : previewPeer?.networkQuality?.downlinkQuality === 1
                          ? require('./assets/network_1.png')
                          : previewPeer?.networkQuality?.downlinkQuality === 2
                            ? require('./assets/network_2.png')
                            : previewPeer?.networkQuality?.downlinkQuality === 3
                              ? require('./assets/network_3.png')
                              : require('./assets/network_4.png')
                    }
                  />
                }
              />
            )}
            {/* <CustomButton
              onPress={() => {}}
              style={styles.singleIconContainer}
              LeftIcon={
                <Feather name="settings" style={styles.videoIcon} size={32} />
              }
            /> */}
          </View>
        </View>
        <CustomButton
          title="Enter Call ->"
          onPress={() => {
            join();
            setLoadingButtonState(true);
          }}
          loading={loadingButtonState}
          viewStyle={styles.joinButton}
          textStyle={styles.joinButtonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.background,
  },
  hmsView: {
    height: '100%',
    width: '100%',
  },
  buttonTextContainer: {
    backgroundColor: Colors.primaryDif,
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  videoIcon: {
    color: Colors.light.inputBackground,
    height: 32,
  },
  muteVideoIcon: {
    color: Colors.dark.borderColor,
  },
  image: {
    height: 32,
    width: 32,
  },
  buttonRow: {
    position: 'absolute',
    maxWidth: '100%',
    zIndex: 99,
  },
  textContainer: {
    position: 'absolute',
    width: '80%',
    zIndex: 99,
    alignItems: 'center',
  },
  peerList: {
    top: 16,
    minWidth: '70%',
    maxWidth: '90%',
    backgroundColor: Colors.OVERLAY,
    borderRadius: 20,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleIconContainer: {
    padding: 8,
    backgroundColor: Colors.dark.borderColor,
    borderColor: Colors.dark.borderColor,
    borderWidth: 1,
    width: 'auto',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  mute: {
    backgroundColor: Colors.light.inputBackground,
    borderColor: Colors.light.inputBackground,
  },
  joinButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  collapsibleText: {
    paddingVertical: 8,
    color: Colors.subText,
    fontSize: 18,
    letterSpacing: 0.15,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: Text_Size.Text_0,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.25,
    color: Colors.light.inputBackground,
    paddingTop: 16,
  },
  lowOpacity: {
    opacity: 0.5,
  },
  highOpacity: {
    opacity: 1,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    width: '40%',
    alignSelf: 'center',
  },
  joinButtonText: {
    fontSize: Text_Size.Text_1,
    lineHeight: 24,
    letterSpacing: 0.5,
    color: Colors.light.background,
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.headerText,
  },
  avatar: {
    width: 144,
    aspectRatio: 1,
    backgroundColor: Colors.primary,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 48,
    lineHeight: 52,
    textAlign: 'center',
    color: Colors.light.inputBackground,
  },
  heading: {
    fontSize: Text_Size.Text_3,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.15,
    color: Colors.light.inputBackground,
  },
});
