import { rest } from 'msw';
import { apiEndpoints } from '../constants/apiEndpoints';

export const handlers = [
    rest.get(apiEndpoints.likeDestination(123, 'like'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(true));
    }),
];
