import { rest } from 'msw';
import { apiEndpoints } from '../constants/apiEndpoints';
import { likeSuccess, newlyAddedImages } from './exampleMocks';

export const handlers = [
    rest.post(apiEndpoints.destination.like('testId', 'like'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(likeSuccess));
    }),

    rest.put(apiEndpoints.destination.addImages('testId'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(newlyAddedImages));
    }),

    rest.put(apiEndpoints.destination.deleteImage('testId'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ deleted: true }));
    }),
];
