import React, { ReactElement } from 'react';
import TopStore from '../components/rank/TopStore';

export default function Root(): ReactElement {
  return (
    <div id="sidebar">
      <h1>Komatzip</h1>
      <div>
        <TopStore />
      </div>
    </div>
  );
}
