import { ToastContainer } from 'react-toastify';
import { ModalContainer } from 'entities/modal';

import { withPersistor, withProviders, withRouter, withStore, withTheme, WithICConnect, WithAchievementProvider } from './providers';
import { RouteManager } from './router';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import './appStyles/index.scss';

const App = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5174") {
        return;
      }

      console.log(window.opener.location)

      window.opener.postMessage('testmessage to parent', 'http://localhost:5174');

      console.log('Received message:', event.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);


  return (
    <>
      <RouteManager />
      <ToastContainer autoClose={4000} hideProgressBar position="bottom-right" closeButton />
      <ModalContainer />
    </>
  );
};

export default withProviders(withRouter, withTheme, withStore, withPersistor, WithICConnect, WithAchievementProvider)(App);
