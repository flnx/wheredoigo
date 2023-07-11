import { extractServerErrorMessage } from '../../utils/utils';
import { ErrorBoundary } from 'react-error-boundary';

// Components
import { NotFound } from './NotFound/NotFound';
import { ServerDown } from './ServerDown/ServerDown';
import { SomethingBroke } from './SomethingBroke/SomethingBroke';

const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => {
    const message = extractServerErrorMessage(error);

    console.error(error);

    if (error?.message === 'Network Error') {
        return <ServerDown />;
    } else if (error?.response?.status == 404) {
        return <NotFound />;
    } else {
        return <SomethingBroke />;
    }
};

export const ErrorBoundaryFallback = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
            {children}
        </ErrorBoundary>
    );
};
