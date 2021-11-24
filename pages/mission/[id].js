import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

const Query = gql`
  query ($id: ID!) {
    launch(id: $id) {
      id
      rocket {
        rocket {
          company
          cost_per_launch
          country
          first_flight
          mass {
            kg
          }
          name
          wikipedia
          description
        }
        rocket_name
        rocket_type
      }
      mission_name
      links {
        flickr_images
      }
      details
    }
  }
`;

export default function SingleMission() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(Query, { variables: { id: id } });
  console.log(data);
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
    <div>
      <Typography variant="h2">{data?.launch?.mission_name}</Typography>
      <img
        src={data?.launch.links.flickr_images[0]}
        style={{ width: "100%", height: 400, objectFit: "cover" }}
      ></img>
      <Typography variant="h6">
        Rocket Type
        {` `}
        {data?.launch?.rocket.rocket_type}
        {` `}
        {data?.launch?.rocket.rocket_name}
      </Typography>
      <Typography variant="h6">
        {data?.launch?.rocket.rocket.description}
      </Typography>
    </div>
  );
}
