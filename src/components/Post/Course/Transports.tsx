import { Transport } from '@to1step/propose-backend';
import { Transportation } from '@to1step/propose-backend/src/database/types/enums';

const TransPorts = ({transports}: {transports: Transport[]}) => {

  const getTransports = (transports: Transportation | null) => {
    switch (transports) {
      case Transportation.BUS:
        return '버스';
      case Transportation.SUBWAY:
        return '지하철';
      case Transportation.WALK:
        return '도보';
      default:
        return '기타';
    }
  }

  return (
    <div>
      <article>
        <p className="text-xs border-black text-gray-700">
          교통수단 : {transports.map(e => getTransports(e.transportation)).join(', ')}
        </p>
      </article>
    </div>
  );
};

export default TransPorts;
