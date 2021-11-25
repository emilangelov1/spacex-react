import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";

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
  const { data, loading, error, refetch } = useQuery(Query, {
    variables: { id: id },
  });
  useEffect(() => {
    refetch({ id: id });
  }, [id]);
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
      {data?.launch?.links?.flickr_images[0] ? (
        <Image
          alt="image of the ship"
          src={data?.launch?.links?.flickr_images[0]}
          layout="responsive"
          width="300px"
          height="400px"
          objectFit="cover"
        />
      ) : (
        ""
      )}
      <Typography variant="h3">
        {data?.launch?.rocket.rocket_type}
        {` `}
        {data?.launch?.rocket.rocket_name}
      </Typography>
      <Typography variant="p1">
        {data?.launch?.rocket.rocket.description}
      </Typography>
    </div>
  );
}
