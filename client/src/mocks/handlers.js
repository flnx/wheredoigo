import { rest } from 'msw';
import { apiEndpoints } from '../constants/apiEndpoints';

export const likeSuccess = { status: true, isLike: true };

export const handlers = [
    rest.post(apiEndpoints.likeDestination('testId', 'like'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(likeSuccess));
    }),
  
];
