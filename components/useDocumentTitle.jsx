import { useEffect, useRef } from 'react';

const useDocumentTitle = (title, retainOnUnmount = false) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;

    return () => {
      if (!retainOnUnmount) {
        document.title = defaultTitle.current;
      }
    };
  }, [title, retainOnUnmount]);
};

export default useDocumentTitle;
