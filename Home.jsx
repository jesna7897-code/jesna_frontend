import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios
        .get("http://localhost:3001/get")
        .then((res) => {
          setBlogs(res.data);
        })
        .catch((err) => console.log(err));
    }, []);
  
    const deleteBlog = (id) => {
      axios
        .delete(`http://localhost:3001/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          setBlogs(blogs.filter((item) => item._id !== id));
        })
        .catch((err) => console.log(err));
    };
  
    const updateBlog = (item) => {
      navigate("/add", { state: item });
    };
  
    return (
      <div style={{ padding: "30px" }}>
        <Grid container spacing={3}>
          {blogs.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={item.img_url}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    Blog
                  </Typography>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteBlog(item._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => updateBlog(item)}
                  >
                    UPDATE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
  
  export default Home;
  