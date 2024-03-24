// import './side-effects';

import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { AdminApp } from '@wsh-2024/admin/src/index';
import { ClientApp } from '@wsh-2024/app/src/index';

// import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();

  const rootElement = document.getElementById('root');
  if (rootElement) {
    if (window.location.pathname.startsWith('/admin')) {
      const root = ReactDOMClient.createRoot(rootElement);
      root.render(<AdminApp />);
    } else {
      const root = ReactDOMClient.createRoot(rootElement);
      root.render(
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <BrowserRouter>
            <ClientApp />
          </BrowserRouter>
        </SWRConfig>,
      );
    }
  }
};

main().catch(console.error);
