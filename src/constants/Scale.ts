import { Dimensions } from "react-native";

// Get window dimensions
export const WINDOW = Dimensions.get("window");
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = WINDOW;

// Reference sizes based on a standard device
const BASE_WIDTH = 393; // Reference width (e.g., iPhone 15 width)
const BASE_HEIGHT = 852; // Reference height (e.g., iPhone 15 height)

// Scale function based on screen width
const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

// Scale function based on screen height
const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

// Moderate scale to adjust intensity of scaling
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Font scaling (optional)
const fontScale = (size: number) => scale(size); // Optionally scale fonts based on screen width

export {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  scale,
  verticalScale,
  moderateScale,
  fontScale,
};
