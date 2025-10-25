import React from "react";
import { Typography, Card, CardContent, CardMedia, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "./styles.css";
import models from "../../modelData/models";

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);

  if (!photos || photos.length === 0) {
    return <Typography variant="body1">No photos found for this user.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Photos of {user.first_name} {user.last_name}
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: 3 }}>
          <CardMedia
            component="img"
            height="400"
            image={`../../images/${photo.file_name}`}
            alt="User photo"
          />
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Uploaded on: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            {photo.comments?.length > 0 ? (
              photo.comments.map((c) => (
                <div key={c._id} style={{ marginBottom: "8px" }}>
                  <Typography variant="body2">
                    <Link to={`/users/${c.user._id}`}>
                      {c.user.first_name} {c.user.last_name}
                    </Link>{" "}
                    ({new Date(c.date_time).toLocaleString()}):
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: 2 }}>
                    {c.comment}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body2">No comments yet.</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
