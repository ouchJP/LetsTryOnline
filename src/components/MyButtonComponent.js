import React, { useState } from 'react';
import {
  Document,
  Page,
  Image,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import cardGenres from './cardGenres.json';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  imageWrapper: {
    width: "33.33%",
    height: "33.33%",
    padding: 5,
    boxSizing: "border-box",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const MyButtonComponent = ({genre}) => {
  const renderImages = () => {
    if (!genre) return null;

    const images = cardGenres[genre];
    const imagesPerPage = 9;
    const numPages = Math.ceil(images.length / imagesPerPage);

    const pages = [];

    for (let i = 0; i < numPages; i++) {
      const startIndex = i * imagesPerPage;
      const endIndex = Math.min(startIndex + imagesPerPage, images.length);
      const pageImages = images.slice(startIndex, endIndex);

      const pageContent = pageImages.map((item) => (
        <View key={item.id} style={styles.imageWrapper}>
          <Image src={window.location.origin + "/" + item.imgUrl} style={styles.image} />
        </View>
      ));

      pages.push(
        <Page key={i} size="A4" style={styles.page}>
          <View style={{ display: "flex", flexWrap: "wrap", height: "100%" }}>
            {pageContent}
          </View>
        </Page>
      );
    }

    return pages;
  };

  return (
    <div>
      {genre && (
        <PDFViewer style={styles.viewer}>
          <Document>
            {renderImages()}
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};

export default MyButtonComponent;
