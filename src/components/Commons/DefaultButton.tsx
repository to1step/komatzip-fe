import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
};
export default function DefaultButton({ children, onClick, type }: Props) {
  return (
    <button
      className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg"
      type={type ?? 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
