import { extractServerErrorMessage } from "../../utils/utils"

// Components
import { NotFound } from "./NotFound/NotFound"
import { ServerDown } from "./ServerDown/ServerDown"
import { SomethingBroke } from "./SomethingBroke/SomethingBroke";

export const ErrorFallbackComponent = ({ error, resetErrorBoundary }) => {
    const message = extractServerErrorMessage(error);
    console.log(message);

    if (error?.message === 'Network Error') {
        return <ServerDown />
    } else if(error?.response?.status == 404) {
        return <NotFound />
    } else {
        return <SomethingBroke />
    } 

}
