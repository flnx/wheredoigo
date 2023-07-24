import { extractServerErrorMessage } from 'src/utils/utils';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, lazy } from 'react';

// Components
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

const NotFound = lazy(() => import('./NotFound/NotFound'));
const ServerDown = lazy(() => import('./ServerDown/ServerDown'));
const SomethingBroke = lazy(() => import('./SomethingBroke/SomethingBroke'));
const Forbidden = lazy(() => import('./Forbidden/Forbidden'));

const componentMap = {
    'Network Error': ServerDown,
    'Not Found': NotFound,
    Forbidden,
    default: SomethingBroke,
};

const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => {
    const errorMessage = extractServerErrorMessage(error);
    const ErrorComponent = componentMap[errorMessage] || componentMap.default;

    return (
        <Suspense fallback={<DarkOverlay isLoading={true} />}>
            <ErrorComponent />
        </Suspense>
    );
};

export const ErrorBoundaryFallback = ({ children }) => {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallbackComponent}
            onError={(error) => {
                const errorMessage = error.message || extractServerErrorMessage(error);

                console.error(errorMessage);
            }}
        >
            <Suspense fallback={<DarkOverlay isLoading={true} />}>{children}</Suspense>
        </ErrorBoundary>
    );
};
