import { extractServerErrorMessage } from '../../utils/utils';
import { ErrorBoundary } from 'react-error-boundary';

// Components
import { NotFound } from './NotFound/NotFound';
import { ServerDown } from './ServerDown/ServerDown';
import { SomethingBroke } from './SomethingBroke/SomethingBroke';

const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => {
    const errorMessage = extractServerErrorMessage(error);

    if (errorMessage === 'Network Error') {
        return <ServerDown />;
    } else if (errorMessage == 'Not Found') {
        return <NotFound />;
    } else {
        return <SomethingBroke />;
    }
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
            {children}
        </ErrorBoundary>
    );
};
