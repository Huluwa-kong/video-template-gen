
import { LoaderCircle, LucideProps } from 'lucide-react';

interface LoadingIconProps extends LucideProps {
  loading: boolean;
}


export const LoadingIcon = ({ loading, ...props }: LoadingIconProps) => {
  // set loading

  if (loading) {
    return (
      <LoaderCircle
        className="animate-spin"
        {...props}
      />
    )
  }
  return <LoaderCircle {...props} />
};
