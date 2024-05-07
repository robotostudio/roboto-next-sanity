import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useMarketingModal = (key: string, delay = 5000) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const paramKey = params.get('campaign');
      if (paramKey && paramKey === key) setIsOpen(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return {
    isOpen,
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
    },
  };
};
