import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    if (location.state) {
      setInputs({
        title: location.state.title,
        content: location.state.content,
        img_url: location.state.img_url,
      });
    }
  }, []);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = () => {
    if (location.state) {
      axios
        .put(
          `http://localhost:3001/update/${location.state._id}`,
          inputs
        )
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        });
    } else {
      axios
        .post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box sx={{ width: "600px", display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          placeholder="Title"
          name="title"
          value={inputs.title}
          onChange={inputHandler}
        />
        <TextField
          placeholder="Content"
          name="content"
          value={inputs.content}
          onChange={inputHandler}
          multiline
          rows={4}
        />
        <TextField
          placeholder="Image URL"
          name="img_url"
          value={inputs.img_url}
          onChange={inputHandler}
        />
        <Button variant="contained" color="secondary" onClick={addData}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Add;
