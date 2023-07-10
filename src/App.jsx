import React, { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function App() {
  const clientId = "YOUR_CLIENT_ID";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "profile email",
      });
    };
    gapi.load("client:auth2", initClient);
  }, [clientId]);

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log("Login Success: currentUser:", res.profileObj);
  };

  const onFailure = (res) => {
    console.log("Login Failed: res:", res);
  };

  const logOut = () => {
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logOut}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </div>
  );
}

export default App;
