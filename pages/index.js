import { useQuery, gql } from "@apollo/client";
import {
  AppBar,
  Card,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Launch from "../components/Launch";
import Layout from "../components/Layout";

const QUERY = gql`
  query {
    launchesPast(limit: 20) {
      id
      mission_name
      details
      links {
        flickr_images
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(QUERY);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "90vw",
          height: "50vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Grid container spacing={2}>
      {data.launchesPast.map((launch, index) => {
        if (!launch.details) {
          return null;
        }
        return (
          <Grid item sm="6" key={launch?.id}>
            <Launch
              id={launch?.id}
              name={launch?.mission_name}
              details={launch?.details}
              images={launch?.links?.flickr_images}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
