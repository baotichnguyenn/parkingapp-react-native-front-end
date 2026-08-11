import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Svg, Text as SvgText, Path } from "react-native-svg";

const TimeChart = () => {
  const data = [
    { x: 1, y: 25, time: "08:00" },
    { x: 2, y: 10, time: "" },
    { x: 3, y: 45, time: "" },
    { x: 4, y: 15, time: "" },
    { x: 5, y: 30, time: "09:00" },
    { x: 6, y: 20, time: "" },
    { x: 7, y: 35, time: "" },
    { x: 8, y: 15, time: "" },
    { x: 9, y: 30, time: "10:00" },
    { x: 10, y: 20, time: "" },
    { x: 11, y: 32, time: "" },
    { x: 12, y: 15, time: "" },
    { x: 13, y: 20, time: "11:00" },
    { x: 14, y: 15, time: "" },
    { x: 15, y: 45, time: "" },
    { x: 16, y: 25, time: "" },
    { x: 17, y: 35, time: "12:00" },
    { x: 18, y: 30, time: "" },
    { x: 19, y: 22, time: "" },
  ];

  const screenWidth = Dimensions.get("window").width - 32; // Full width minus padding

  // Chart dimensions
  const chartHeight = 150;
  const paddingTop = 20;
  const paddingBottom = 30;
  const contentHeight = chartHeight - paddingTop - paddingBottom;

  // Bar width and spacing calculation
  const barWidth = 10;

  const totalWidth = screenWidth - 10; // Adjust for left/right padding
  const itemWidth = totalWidth / data.length;

  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((d) => d.y));

  // Scale factor for bar height
  const scaleY = contentHeight / maxValue;

  // Extract hour labels for x-axis ticks
  const hourLabels = data.filter((item) => item.time !== "");

  return (
    <View style={styles.container}>
      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <Svg width={screenWidth} height={chartHeight}>
          {data.map((d, index) => {
            const barHeight = d.y * scaleY;
            const x = index * itemWidth + (itemWidth - barWidth) / 2;
            const y = paddingTop + (contentHeight - barHeight);
            const radius = 5;

            const path = `
    M${x},${y + radius}
    a${radius},${radius} 0 0 1 ${radius},-${radius}
    h${barWidth - 2 * radius}
    a${radius},${radius} 0 0 1 ${radius},${radius}
    v${barHeight - radius}
    h-${barWidth}
    Z
  `;

            return <Path key={`bar-${index}`} d={path} fill={Colors.primary} />;
          })}

          {hourLabels.map((label, index) => {
            // const x = (label.x - 1) * itemWidth + (itemWidth / 2);
            const paddingLeft = 10;
            const x = (label.x - 1) * itemWidth + itemWidth / 2 + paddingLeft;

            return (
              <SvgText
                key={`label-${index}`}
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                fill={Colors.grey100}
                fontSize={10}
                fontFamily={Fonts.regular}
              >
                {label.time}
              </SvgText>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    padding: 1,
    width: "100%",
  },
  chartContainer: {
    // backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TimeChart;
