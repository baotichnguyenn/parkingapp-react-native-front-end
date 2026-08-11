import { Dimensions } from "react-native";

export const WINDOW = Dimensions.get("window");

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export { SCREEN_HEIGHT, SCREEN_WIDTH };

const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };
