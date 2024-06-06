import {PixelRatio, Platform} from 'react-native';
import {SCREEN_WIDTH} from './windowSize';

const scale = SCREEN_WIDTH / 280;
// const scale2 =
//   SCREEN_WIDTH <= 380
//     ? SCREEN_WIDTH / 300
//     : SCREEN_WIDTH <= 600
//     ? SCREEN_WIDTH / 280
//     : SCREEN_WIDTH / 270;
export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
export function normalizeInput(size, text) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  if (size === 12 && text === 'text12') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4;
}
const Text_Size_Type = {
  Scale: {
    Text_0: normalize(11),
    Text_1: normalize(12),
    Text_2: normalize(13),
    Text_3: normalize(15),
    Text_4: normalize(16),
    Text_5: normalize(17),
    Text_6: normalize(19),
    Text_7: normalize(20),
    Text_8: normalize(9),
    Text_9: normalize(10),
    Text_10: normalize(9),
    Text_11: normalizeInput(12),
    Text_12: normalizeInput(13, 'text12'),
  },
};
const Text_Size = Text_Size_Type.Scale;
export default Text_Size;
