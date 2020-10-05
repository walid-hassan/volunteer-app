import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';


const Categories = ({categorie}) => {
    const color = ["#FFBD3E", "#FF7044", "#3F90FC", "#421FCF", "#F04F1D", "#6A4AEE", "#F4BE57"];
    const bg = {
        background: color[Math.round(Math.random() * 3)]
    }
    const col = color[Math.round(Math.random() * 6)]
    console.log("color: ", col);
    return (
        <Grid item item md={3}>
            <Link style={{textDecoration:"none"}} to={`/registration/${categorie._id}`}>
                <Box className="catPic" >
                        <img src={categorie.pic} alt=""/>
                    <Box style={bg} className="catTitle">
                        <h6>{categorie.name}</h6>
                    </Box>
                </Box>
            </Link>
        </Grid>
        
    );
};

export default Categories;