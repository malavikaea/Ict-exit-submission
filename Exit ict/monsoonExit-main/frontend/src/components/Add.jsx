import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
   var location =useLocation()
  const navigate = useNavigate();
  var [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });


    useEffect(()=>{
    if(location.state !== null){
      
        const { title, content, img_url } = location.state;
      setInputs({ title, content, img_url });
      }
    } 
,[location.state]);

  const inputHandler = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("in",inputs);
  };


  const addData = () => {
    console.log("clicked");

    if (location.state !== null && location.state._id) {
      // ✅ Update
      axios
        .put(`http://localhost:3001/update/${location.state._id}`, inputs)
        .then((res) => {
          alert("Blog updated successfully!");
          navigate("/");
        })
        .catch((err) => {
          console.error("Update error:", err);
        });
    } 

    else{


    axios
      .post("http://localhost:3001/add",inputs)
      .then((res) => {
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              onChange={inputHandler}
              name="title"
              value={inputs.title}
              fullWidth
            />
            <TextField
              variant="outlined"
              placeholder="content"
              onChange={inputHandler}
              name="content"
              value={inputs.content}
              multiline={4}
            />
            <TextField
              variant="outlined"
              placeholder="image url"
              onChange={inputHandler}
              name="img_url"
              value={inputs.img_url}
            />

            <Button variant="contained" color="secondary" onClick={addData}>
              Submit
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Add;
