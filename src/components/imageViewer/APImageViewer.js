import React from 'react';
import ImageViewer from 'react-simple-image-viewer';
const APImageViewer = ({ images , currentImage, setCurrentImage, isViewerOpen, setIsViewerOpen,closeImageViewer }) => {

  return <div >{isViewerOpen && <ImageViewer src={images} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}</div>;
};

export default APImageViewer;
