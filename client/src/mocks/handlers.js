import { rest } from 'msw';
import { apiEndpoints } from '../constants/apiEndpoints';

export const likeSuccess = { status: true, isLike: true };
const newlyAddedImages = {
    imageUrls: [
        {
            imageUrl:
                'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
            _id: 'id4',
        },
        {
            imageUrl:
                'https://images.pexels.com/photos/130879/pexels-photo-130879.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&dpr=1',
            _id: 'id5',
        },
    ],
    imgError: null,
};

export const handlers = [
    rest.post(apiEndpoints.likeDestination('testId', 'like'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(likeSuccess));
    }),

    rest.put(apiEndpoints.addDestinationImages('testId'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(newlyAddedImages));
    }),

    rest.put(apiEndpoints.deleteDestinationImage('testId'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ deleted: true }));
    }),
];
