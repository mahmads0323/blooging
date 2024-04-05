import { createContext, useContext, useState } from 'react';

const ContextStore = createContext(null);

const ContextStoreProvider = (props) => {
  const [isLoginPortalOpen, setIsLoginPortalOpen] = useState(false);

  const openLoginPortal = () => {
    setIsLoginPortalOpen(true);
  };
  const closeLoginPortal = () => {
    setIsLoginPortalOpen(false);
  };

  return (
    <ContextStore.Provider
      value={{ isLoginPortalOpen, openLoginPortal, closeLoginPortal }}
    >
      {props.children}
    </ContextStore.Provider>
  );
};

export const useContextStore = () => useContext(ContextStore);
export default ContextStoreProvider;
