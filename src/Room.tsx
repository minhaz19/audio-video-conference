/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {HMSLocalPeer} from '@100mslive/react-native-hms';
import {usePeerTrackNodes} from './fn/funtion';
import {PreviewModal} from './Preview';
import Text_Size from './constants/textScaling';
import Colors from './constants/Colors';
import Peer from './Peer';
import BigText from './constants/BigText';

interface Props {
  navigation: {
    navigate: (arg: string) => void;
  };
}
const Room = ({navigation}: Props) => {
  const [localPeer, setLocalPeer] = useState<HMSLocalPeer>();
  const [isAudioMute, setIsAudioMute] = useState<boolean | undefined>(
    localPeer?.audioTrack?.isMute(),
  );

  const [isVideoMute, setIsVideoMute] = useState<boolean | undefined>(
    localPeer?.videoTrack?.isMute(),
  );

  const {
    peerTrackNodes,
    loading,
    leaveRoom,
    hmsInstanceRef,
    modalType,
    joinButtonLoading,
    setJoinButtonLoading,
    hmsRoom,
    previewTracks,
    onJoinRoom,
  } = usePeerTrackNodes(navigation);

  const HmsView = hmsInstanceRef.current?.HmsView;
  const _keyExtractor = (item: {id: any}) => item.id;
  const hmsInstance = hmsInstanceRef.current;

  const audioAllowed = localPeer?.audioTrack?.type;
  const videoAllowed = localPeer?.videoTrack?.type;

  // for leaving the room
  const handleRoomEnd = async () => {
    await leaveRoom();
  };
  useEffect(() => {
    setIsVideoMute(localPeer?.videoTrack?.isMute());
    setIsAudioMute(localPeer?.audioTrack?.isMute());
  }, [localPeer]);

  useEffect(() => {
    const updateLocalPeer = async () => {
      await hmsInstance
        ?.getLocalPeer()
        .then((peer: React.SetStateAction<HMSLocalPeer | undefined>) => {
          setLocalPeer(peer);
        });
    };

    if (hmsInstance) {
      updateLocalPeer();
    }
  }, [hmsInstance]);

  console.log(modalType);

  return (
    <>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          {modalType === 'preview' && previewTracks ? (
            <PreviewModal
              room={hmsRoom}
              previewTracks={previewTracks}
              join={onJoinRoom}
              setLoadingButtonState={setJoinButtonLoading}
              loadingButtonState={joinButtonLoading}
              hmsInstance={hmsInstance}
              setIsAudioMute={setIsAudioMute}
              isAudioMute={isAudioMute}
              setIsVideoMute={setIsVideoMute}
              isVideoMute={isVideoMute}
            />
          ) : (
            <SafeAreaView style={{flex: 1, backgroundColor: Colors.headerText}}>
              {/* <View > */}
              <BigText
                text={'Woofmeets Conference'}
                textStyle={{
                  fontSize: Text_Size.Text_3,
                  color: Colors.light.background,
                  textAlign: 'center',
                  paddingTop: 10,
                }}
              />
              <FlatList
                centerContent={true}
                data={peerTrackNodes}
                showsVerticalScrollIndicator={false}
                keyExtractor={_keyExtractor}
                renderItem={(item: any) => {
                  return <Peer item={item?.item} HmsView={HmsView} />;
                }}
                contentContainerStyle={{
                  flexGrow: Platform.OS === 'android' ? 1 : undefined,
                  justifyContent:
                    Platform.OS === 'android' ? 'center' : undefined,
                }}
              />
              <View style={styles.iconBottomWrapper}>
                <View style={styles.iconBotttomButtonWrapper}>
                  {videoAllowed && (
                    <TouchableOpacity
                      onPress={() => {
                        localPeer?.localVideoTrack()?.setMute(!isVideoMute);
                        setIsVideoMute(!isVideoMute);
                      }}
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: isVideoMute
                            ? Colors.washedRed
                            : Colors.subText,
                        },
                      ]}>
                      <Feather
                        name={isVideoMute ? 'video-off' : 'video'}
                        style={{color: Colors.light.background}}
                        size={20}
                      />
                    </TouchableOpacity>
                  )}
                  {audioAllowed && (
                    <TouchableOpacity
                      onPress={() => {
                        localPeer?.localAudioTrack()?.setMute(!isAudioMute);
                        setIsAudioMute(!isAudioMute);
                      }}
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: isAudioMute
                            ? Colors.washedRed
                            : Colors.subText,
                        },
                      ]}>
                      <Feather
                        name={isAudioMute ? 'mic-off' : 'mic'}
                        style={{color: Colors.light.background}}
                        size={20}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={handleRoomEnd}
                    style={[
                      styles.iconContainer,
                      {backgroundColor: Colors.washedRed},
                    ]}>
                    <Feather
                      name={'phone'}
                      style={{color: Colors.light.background}}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {/* </View> */}
            </SafeAreaView>
          )}
        </>
      )}
    </>
  );
};

export default Room;

const styles = StyleSheet.create({
  iconBottomWrapper: {
    width: '100%',
    paddingVertical: 4,
    backgroundColor: Colors.OVERLAY,
    zIndex: 2,
    borderRadius: 16,
  },
  iconBotttomButtonWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconContainer: {
    bottom: 40,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
