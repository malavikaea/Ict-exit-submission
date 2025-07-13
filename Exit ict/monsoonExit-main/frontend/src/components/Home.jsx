//Create the Home UI for the BlogAPP(Cards are preferrred; You may choose your UI preference )
import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

const Home = () => {

    var navigate = useNavigate()
    const [blog,setBlogs]=useState([]);
    useEffect(()=>
    {
    fetch('http://localhost:3001/get')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
    },[]);




    const handleDelete = async (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
                .then(()=>{
                    console.log({message: "deleted"})
                    window.location.reload();
                })
    }
  return (
    <div>
        <Grid container  spacing={2} sx={{ p: 5 }}>
             {blog.map((blog, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img" 
                        sx={{ height: 140 }}
                        image={blog.img_url|| "https://via.placeholder.com/300"}
                        title={blog.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {blog.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {blog.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button  variant ='contained'color='secondary'   onClick ={()=> handleDelete(blog._id)} size="small">DELETE</Button>
                        <Button   variant ='contained'color='secondary'  onClick={() => navigate("/add",{state:blog})} size="small">UPDATE </Button>
                    </CardActions>
                    </Card>
                </Grid>
             ))}
        </Grid>
    </div>
  )
}

export default Home
