import { DsBox } from '../Box';

type LoadingSpinnerProps = {
  message?: string;
};

export const DsLoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <DsBox className="absolute z-90 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <DsBox className="w-10 h-10 border-2 border-gray-300 border-dashed rounded-full animate-spin mx-auto"></DsBox>
      <DsBox className="text-sm font-light dark:text-gray-200 text-gray-900 mt-4">{message}</DsBox>
    </DsBox>
  );
};
