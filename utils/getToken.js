import { Auth } from "aws-amplify";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

export async function getCurrentUserToken() {
  try {
    const user = await getCurrentUser();
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    return idToken;
  } catch (error) {
    console.log("Error getting current user token", error);
    return null;
  }
}
