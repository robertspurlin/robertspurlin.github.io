import React from 'react';
import { Head } from 'react-static';
import { useLocation } from '@reach/router';

const CustomHead = () => {
  const location = useLocation();
 
  const pathName = location.pathname;

  let link = "Home";

  if (pathName != "/" && pathName.indexOf("post") === -1) {
    // Filter out trailing slashes and periods from the entire path
    const fileName = pathName.replace(/[\/.]/g, ' ');

    const filteredPath = fileName.split(' ').filter(function(word){
      return word !== '';
    });

    // Get the last element in the filteredPath array, and remove symbols from it
    link = filteredPath[filteredPath.length - 1].replace(/[^a-zA-Z0-9]/g, ' ');
    link = link.charAt(0).toUpperCase() + link.slice(1);
  }

  if (pathName.indexOf("post") !== -1) {
    link = "Blog";
  }

  return (
    <Head>
      <title>Robert Spurlin: { link } </title>
      <link rel='icon' href='/images/favicon.png' />
    </Head>
  )
};

export default CustomHead;