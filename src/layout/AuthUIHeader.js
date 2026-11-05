import { Text, View, Image } from "react-native";
import { useTheme } from "@aws-amplify/ui-react-native";

const AuthUIHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: fontSizes.xxl,
          fontWeight: 700,
          paddingBottom: 10,
          textAlign: "center",
          color: "#005999",
        }}
      >
        Beach Buddy
      </Text>
      <Image
        source={require("../../assets/expo-images/sea96.png")}
        style={{ height: 100, width: 100 }}
      />
    </View>
  );
};
export default AuthUIHeader;
