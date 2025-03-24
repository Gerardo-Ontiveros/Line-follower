import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const Widget = ({
  title,
  content,
  width,
  height,
  children,
  className,
  center,
  paddingDefault,
}) => {
  return (
    <View
      className={`flex ${className} px-2 rounded-sm shadow-sm shadow-[#1A1A21] py-4`}
      style={[width ? { width } : { width: "100%" }, height ? { height } : ""]}
    >
      <Text
        className="text-white text-[12px] font-bold"
        style={[
          center ? { textAlign: "center" } : "",
          paddingDefault ? { paddingLeft: 10 } : "",
        ]}
      >
        {title}
      </Text>
      {content && (
        <Text
          className="text-white text-[50px] font-bold"
          style={[center ? { textAlign: "center" } : ""]}
        >
          {content}
        </Text>
      )}
      {children}
    </View>
  );
};

export default Widget;

const styles = StyleSheet.create({});
