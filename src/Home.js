import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function Home(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
    console.log("Photos: ", props)
  const photos = []
  
   const makegrid = () => {
      
      for(var i=0;i<props.images.images.length;i++){
          console.log(props.images.images[i])
          photos.push({
              
              src: props.images.images[i].src,
            width: 1,
             height: 1
          })
      }
  }

  function styleFn(base, state) {
  // optionally spread base styles
  return { ...base, color: state.isModal ? 'blue' : 'red' };
}

 

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
    console.log(props)
    props.slideToggle(viewerIsOpen)
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
    props.slideToggle(viewerIsOpen)
  };
  if(props.images===undefined && photos.length==0){
        return <h1>Loading...</h1>
    }

    else{
    return (

    <div>
    {    makegrid()}
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox} style={{height:'400px'}}>
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
