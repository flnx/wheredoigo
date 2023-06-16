import { render, screen, userEvent, waitFor } from '../../../utils/test-utils';
import { StarRating } from '../StarRating';
import styles from '../StarRating.module.css';

describe('StarRating testing', () => {
    it('renders the correct number of stars', () => {
        const averageRating = 3.5;
        render(<StarRating averageRating={averageRating} />);
        const stars = screen.getAllByLabelText(/star rating/i);
        expect(stars).toHaveLength(5);
    });

    it('fills stars up to the rounded rating (5)', () => {
        const averageRating = 4.7;
        render(<StarRating averageRating={averageRating} />);

        const filledStars = screen.getAllByLabelText(/filled/i);
        const unfilledStars = screen.queryAllByLabelText(/light/i);

        expect(filledStars).toHaveLength(5);
        expect(unfilledStars).toHaveLength(0);
    });

    it('fills stars up to the rounded rating (4)', () => {
        const averageRating = 3.4;
        render(<StarRating averageRating={averageRating} />);

        const filledStars = screen.getAllByLabelText(/filled/i);
        const unfilledStars = screen.queryAllByLabelText(/light/i);

        expect(filledStars).toHaveLength(3);
        expect(unfilledStars).toHaveLength(2);
    });

    it('renders stars with custom size', () => {
        const averageRating = 2.5;
        const size = 24;
        render(<StarRating averageRating={averageRating} size={size} />);

        const stars = screen.getAllByLabelText(/star rating/i);
        stars.forEach((star) => {
            expect(star).toHaveAttribute('width', size.toString());
        });
    });
});
