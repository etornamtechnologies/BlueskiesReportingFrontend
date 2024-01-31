import React from 'react';
import './App.less';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'
import { ConfigProvider, theme } from 'antd';
import { useAppSelector } from './redux_store/hook'


function App() {
  const appConfigState = useAppSelector(state => state.app_config)
  const appTheme = appConfigState.theme

  return (
    <ConfigProvider
      theme={{
        algorithm: appTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        components: {
          Menu: {
            itemHoverBg: "#32a852",
            itemSelectedBg: "#32a852",
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
