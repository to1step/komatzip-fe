import React from 'react';
import Tags from '../Post/Tags';
import Description from '../Post/Description';
import Location from '../Post/Location';
import Name from '../Post/Name';
import Image from '../Post/Image';
import Category from '../Post/Category';
// import { Link } from 'react-router-dom';
// import StoreInfo from '../modal/StoreInfo';

const Topstore = () => {
  return (
    <div className="fles justify-center items-center w-320 h-394">
      <Image />
      <Name />
      <Location />
      <Description />
      <Category />
      <Tags />
    </div>
  );
};

export default Topstore;
