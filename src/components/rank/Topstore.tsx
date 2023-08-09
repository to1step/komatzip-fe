import React from 'react';
import Tags from '../Post/Tags';
import Description from '../Post/Description';
import Location from '../Post/Location';
import Name from '../Post/Name';
// import { Link } from 'react-router-dom';
// import StoreInfo from '../modal/StoreInfo';

const Topstore = () => {
  return (
    <div>
      <Name />
      <Location />
      <Description />
      <Tags />
    </div>
  );
};

export default Topstore;
