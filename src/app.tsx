import React, { useContext, useEffect, useState } from "react";
import { Flex } from "rebass";
import { Routes } from "./routes";
import Loader from "./components/loader";
import LoginIndicator from "./components/loginIndicator";
import { AuthContext } from ".";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const { setToken } = useContext(AuthContext);

  const apiRefreshUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/refresh_token"
      : "https://api.henril.com/refresh_token";

  useEffect(() => {
    fetch(`${apiRefreshUrl}`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const d = await res.json();
      if (d.accessToken?.length > 0) {
        setToken(d.accessToken);
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {({ isLogged }) => (
            <>
              {!isLogged && (
                <LoginIndicator
                  url={`https://accounts.spotify.com/authorize?client_id=703964811f5f4213bdef5cf1f4850a63&response_type=code&redirect_uri=${encodeURIComponent(
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:3000/login/"
                      : "https://ms.henril.com/login"
                  )}&scope=user-read-private user-read-recently-played`}
                />
              )}
            </>
          )}
        </AuthContext.Consumer>
      </Flex>
    </>
  );
};
