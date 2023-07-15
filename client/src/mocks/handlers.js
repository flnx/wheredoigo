import { rest } from 'msw';
import { apiEndpoints } from '../constants/apiEndpoints';
import { likeSuccess, newlyAddedImages } from './exampleMocks';

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
