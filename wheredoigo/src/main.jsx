import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import App from './App';

import './styles/reset.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/theme.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </BrowserRouter>
);

{/* <React.StrictMode>
</React.StrictMode> */}
