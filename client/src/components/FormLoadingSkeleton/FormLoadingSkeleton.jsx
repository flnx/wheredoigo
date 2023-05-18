import { LoadingSkeleton } from '../LoadingSkeletons/LoadingSkeleton';
import { checkArrayAndPreloadElements } from '../../utils/utils';

export const FormLoadingSkeleton = () => {
    const dataDuringLoading = checkArrayAndPreloadElements([], 7);

    return dataDuringLoading.map((x) => (
        <div key={x._id}>
            <LoadingSkeleton />
        </div>
    ));
};
