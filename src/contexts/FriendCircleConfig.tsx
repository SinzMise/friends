import { createContext, useContext, ReactNode } from 'react';

interface FriendCircleConfig {
  private_api_url: string;
  page_turning_number: number;
  error_img: string;
}

const defaultConfig: FriendCircleConfig = {
  private_api_url: 'https://fc.blog.sinzmise.top/',
  page_turning_number: 24,
  error_img: 'https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg'
};

const FriendCircleConfigContext = createContext<{
  config: FriendCircleConfig;
}>({
  config: defaultConfig
});

export function FriendCircleConfigProvider({ children }: { children: ReactNode }) {
  return (
    <FriendCircleConfigContext.Provider value={{ config: defaultConfig }}>
      {children}
    </FriendCircleConfigContext.Provider>
  );
}

export function useFriendCircleConfig() {
  return useContext(FriendCircleConfigContext);
}
