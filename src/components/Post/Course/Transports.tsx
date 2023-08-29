import { Transportation } from '@to1step/propose-backend/src/database/types/enums';
import { Transport } from '@to1step/propose-backend';

interface TransPortsProps {
  transports: Transport[];
}

const TransPorts = ({ transports }: TransPortsProps) => {
  return <div>{transports}</div>;
};

export default TransPorts;
