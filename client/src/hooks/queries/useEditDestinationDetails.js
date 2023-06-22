import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editDestinationDetails } from '../../service/data/destinations';
import { queryEndpoints } from '../../constants/reactQueryEndpoints';

export const useEditDestinationDetails = (destinationId) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => editDestinationDetails(destinationId, data),
        onSuccess: (updatedField) => {
            const { categoryId, infoId, description, categories } = updatedField;

            const destination = queryClient.getQueryData([
                queryEndpoints.editDestination,
                destinationId,
            ]);

            let updatedDestination;

            if (categories) {
                updatedDestination = {
                    ...destination,
                    category: categories,
                };
            } else {
                updatedDestination =
                    infoId === 'Description'
                        ? { ...destination, description }
                        : {
                              ...destination,
                              details: destination.details.map((detail) => {
                                  if (detail._id !== categoryId) {
                                      return detail;
                                  }

                                  return {
                                      ...detail,
                                      info: detail.info.map((info) => {
                                          if (info._id !== infoId) {
                                              return info;
                                          }

                                          return { ...info, description };
                                      }),
                                  };
                              }),
                          };
            }

            queryClient.setQueryData(
                [queryEndpoints.editDestination, destinationId],
                updatedDestination
            );

            queryClient.invalidateQueries([
                queryEndpoints.destination,
                destinationId,
            ]);

            queryClient.invalidateQueries([queryEndpoints.creatorDestinations]);
        },
    });

    return [mutate, isLoading];
};
