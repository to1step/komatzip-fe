import { ReactNode } from 'react';
import ModalPortal from './ModalPortal';

interface Props {
  children: ReactNode;
}
const ModalComponent = ({ children }: Props) => {
  return (
    <ModalPortal>
      <div className="z-2 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80">
        {children}
      </div>
    </ModalPortal>
  );
};

export default ModalComponent;
