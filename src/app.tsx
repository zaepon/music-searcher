import React, { useEffect, useState } from "react";
import { Flex } from "rebass";
import { Routes } from "./routes";
import Loader from "./components/loader";
import { setAccessToken } from "./accessToken";

export const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASEURL}`, {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const d = await res.json();
      setAccessToken(d.accesstoken);
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
  return <Routes />;
};
