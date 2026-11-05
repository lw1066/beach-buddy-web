import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Pressable, Text } from "react-native";
import styles from "../styles/styles";

const userSelector = (context) => [context.user];

export const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonSignout}>
      <Text style={styles.buttonText}>sign out</Text>
    </Pressable>
  );
};
