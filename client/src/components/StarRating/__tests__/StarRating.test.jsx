import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { StarRating } from '../StarRating';
import styles from '../StarRating.module.css';

describe('ImageThumbnailsPreview testing', () => {
    it('renders the correct number of stars', () => {
        const averageRating = 3.5;
        render(<StarRating averageRating={averageRating} />);
        const stars = screen.getAllByLabelText(/stars rating/i);
        expect(stars).toHaveLength(5);
    });
});
