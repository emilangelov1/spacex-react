import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

export default function Launch({
  details = "",
  name = "",
  images = [],
  id = "",
}) {
  // console.log(id);
  // console.log(images);
  const { push } = useRouter();
  return (
    <Box>
      <Card>
        {images.length ? (
          <CardMedia
            component="img"
            height="140"
            src={images[0]}
            alt="green iguana"
          />
        ) : (
          ""
        )}
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography>{details}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              push("/mission/[id]", `/mission/${id}`);
            }}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
