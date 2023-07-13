import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundaryFallback as ErrorBoundary } from './components/Errors/ErrorFallbackComponent';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

import './styles/reset.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/theme.css';
import './styles/utils.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <ErrorBoundary key="global">
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </BrowserRouter>
    // </ErrorBoundary>
);
