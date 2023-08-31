import React from 'react';
import { Transportation } from '@to1step/propose-backend/src/database/types/enums';

interface TransPortsProps {
  transports: Transportation;
}

const TransPorts = ({ transports }: TransPortsProps) => {
  let transportName = '';

  switch (transports) {
    case Transportation.BUS:
      transportName = '버스';
      break;
    case Transportation.SUBWAY:
      transportName = '지하철';
      break;
    case Transportation.WALK:
      transportName = '도보';
      break;
    default:
    case Transportation.ELSE:
      transportName = '기타';
      break;
  }
  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">
          교통수단 : {transportName}
        </p>
      </article>
    </div>
  );
};

export default TransPorts;
