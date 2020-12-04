import React, { useContext, useEffect, useState } from "react";
import { Flex } from "rebass";
import { Routes } from "./routes";
import Loader from "./components/loader";
import LoginIndicator from "./components/loginIndicator";
import { AuthContext } from ".";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const d = await res.json();
      if (d.accessToken?.length > 0) {
        setToken(d.accesstoken);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center">
        <Loader />
      </Flex>
    );
  }
  return (
    <>
      <Routes />{" "}
      <Flex justifyContent="center">
        <AuthContext.Consumer>
          {({ accessToken }) => (
            <>
              {accessToken?.length === 0 && (
                <LoginIndicator
                  url={`https://accounts.spotify.com/authorize?client_id=${
                    process.env.REACT_APP_CLIENT_ID
                  }&response_type=code&redirect_uri=${encodeURIComponent(
                    process.env.REACT_APP_LOGIN_CALLBACK_URL as string
                  )}&scope=user-read-private`}
                />
              )}
            </>
          )}
        </AuthContext.Consumer>
      </Flex>
    </>
  );
};
