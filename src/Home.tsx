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

const Home = () => {
  const navigation = useNavigation();
  const handleJoinPress = () => {
    navigation.navigate('Room');
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
