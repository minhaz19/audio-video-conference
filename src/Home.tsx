import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { checkPermissions } from './fn/funtion';
import { PERMISSIONS } from 'react-native-permissions';

const Home = () => {
  const navigation = useNavigation();
  const handleJoinPress = async () => {
    const permissionsGranted = await checkPermissions([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO
    ]);
    if (permissionsGranted) {
      navigation.navigate('Room');
    } else {
      console.log('Permission Not Granted!');
    }

  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EFF7FF' }}>
      <StatusBar barStyle={'dark-content'} />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight
          onPress={handleJoinPress}
          underlayColor="#143466"
          style={{
            paddingHorizontal: 20,
            paddingVertical: 12,
            backgroundColor: '#2471ED',
            borderRadius: 8
          }}>
          <Text style={{ fontSize: 20, color: '#ffffff' }}>Join Room</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
