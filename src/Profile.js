import React, { useState, useCallback, useEffect } from "react";
import { Container, Typography, Button } from "@material-ui/core";


export default function Profile(props) {
  

  

  console.log('Profile Props: ',props)


    return (

    <div>
  <Container>
    <Typography variant='h1'>Profile</Typography>
    <Button color="primary" variant="contained" onClick={()=>props.orderInfo(localStorage.getItem('CID'))}>View Past Orders</Button>
  </Container>
    </div>
  );
    

 
}
