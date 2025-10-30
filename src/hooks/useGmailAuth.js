// src/hooks/useGmailAuth.js
import { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "803321891509-hvsdtnbibcoecpih2rv634dfbe9d73bf.apps.googleusercontent.com";
const API_KEY = "AIzaSyCeVx8BWNq3KtXmD5y6XUMMIn2hG8Gs9i0";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send";

export default function useGmailAuth() {
  useEffect(() => {
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
        scope: SCOPES,
      });
    }

    gapi.load("client:auth2", initClient);
  }, []);

  const signIn = async () => {
    await gapi.auth2.getAuthInstance().signIn();
  };

  const signOut = async () => {
    await gapi.auth2.getAuthInstance().signOut();
  };

  return { signIn, signOut, gapi };
}
