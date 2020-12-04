import React, { useContext, useEffect, useState } from "react";
import { History, LocationState } from "history";
import Topbar from "../components/topbar";
import { Box, Flex } from "rebass";
import { withTheme } from "styled-components";
import Loader from "../components/loader";
import { useGetAccessTokenMutation } from "../generated/graphql";
import { AuthContext } from "..";

interface LoginProps {
  history: History<LocationState>;
}

const Login = (props: LoginProps) => {
  const [getAccessToken] = useGetAccessTokenMutation();
  const [error, setError] = useState(false);
  const { setToken } = useContext(AuthContext);
  const q = new URLSearchParams(window.location.search);
  const code = q.get("code");
  useEffect(() => {
    const getToken = async () => {
      console.log(code);
      const tokenData = await getAccessToken({
        variables: { code: code as string },
      });

      if (tokenData.errors) {
        setError(true);
      }
      if (tokenData.data?.getAccessToken) {
        setToken(tokenData.data.getAccessToken.token);
        props.history.push("/");
      }
    };
    getToken();
  }, []);
  return (
    <>
      <Box className="App">
        <Topbar />
      </Box>
      <Flex justifyContent="center">
        {!error && <Loader />}
        {error && <div>Failed to authenticate</div>}
      </Flex>
    </>
  );
};

export default withTheme(Login as any);
