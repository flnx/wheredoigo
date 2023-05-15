import { LoadingSkeleton } from "../LoadingSkeletons/LoadingSkeleton"

export const TextWrap = ({ isLoading, content}) => {
    return (
        <>
            {isLoading ? <LoadingSkeleton /> : content}
        </>
    )
}
