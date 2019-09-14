import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import './assets/gallery.css'
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  placeholder: {
    height: 40,
  },
  headingHome:{
    textAlign:'center'
  }
}));


export default function Home(props) {
  const classes = useStyles()

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
    console.log("Photos: ", props)
  const photos = []
  
   const makegrid = () =>  {
      
      for(var i=0;i<props.images.images.length;i++){
          console.log(props.images.images[i])
          photos.push({
              
              src: props.images.images[i].src,
            width: 1,
             height: 1
          })
      }
  }

useEffect(() => {
  console.log('Viewer Open Props:',props)
    props.slideToggle(viewerIsOpen)

  }, [viewerIsOpen]);




 

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
    console.log(props)
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  if(props.images===undefined && photos.length===0){
        return <h1>Loading...</h1>
    }

    else{
    return (

    <div>
    {    makegrid()}
    <Typography variant="h1" className={classes.headingHome}>Welcome to Sentimental Denim</Typography>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox} >
            <Carousel 

              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> 
    </div>
  );
    }

 
}
