import React, { useEffect, useState } from "react";
import { Flex } from "rebass";
import { Routes } from "./routes";
import Loader from "./components/loader";
import { setAccessToken } from "./accessToken";
import LoginIndicator from "./components/loginIndicator";

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const d = await res.json();
      setAccessToken(d.accesstoken);
      setLoggedIn(true);
      setLoading(false);
    });
  });

  if (loading) {
    return (
      <Flex justifyContent="center">
        <Loader />
      </Flex>
    );
  }
  return (
    <>
      {" "}
      <Routes />{" "}
      <Flex justifyContent="center">
        {!loading && !loggedIn && (
          <LoginIndicator
            url={`https://accounts.spotify.com/authorize?client_id=${
              process.env.REACT_APP_CLIENT_ID
            }&response_type=code&redirect_uri=${encodeURIComponent(
              process.env.REACT_APP_LOGIN_CALLBACK_URL as string
            )}&scope=user-read-private`}
          />
        )}
      </Flex>
    </>
  );
};
