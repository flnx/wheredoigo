import styles from './Content.module.css';

import { StarRating } from 'src/components/StarRating/StarRating';
import { TextWrap } from 'src/components/TextWrap/TextWrap';
import { LinkButtonSuccess } from 'src/components/Buttons/Success-Button/LinkButtonSuccess';
import { WarningButton } from 'src/components/Buttons/Button-Warning/WarningButton';

import routeConstants from 'src/constants/routeConstants';

export const Content = ({ place, isLoading, isOwner, onDeleteClickHandler }) => {
    const { name, averageRating, city, country, _id } = place;

    return (
        <section className={styles.content}>
            <h4 className={styles.placeName}>
                <TextWrap isLoading={isLoading} content={name} />
            </h4>

            <TextWrap
                isLoading={isLoading}
                content={<StarRating averageRating={averageRating} size={20} />}
            />

            <span className={styles.location}>
                <TextWrap isLoading={isLoading} content={`${city}, ${country}`} />
            </span>

            {isOwner && !isLoading && (
                <OwnerButtons
                    _id={_id}
                    onDeleteClickHandler={onDeleteClickHandler}
                    isLoading={isLoading}
                />
            )}
        </section>
    );
};

const OwnerButtons = ({ _id, onDeleteClickHandler }) => {
    const { EDIT } = routeConstants.PLACES;

    return (
        <div className={styles.buttons}>
            <LinkButtonSuccess to={EDIT.routePath(_id)}>Edit</LinkButtonSuccess>
            <WarningButton onClickHandler={() => onDeleteClickHandler(_id)}>
                Delete
            </WarningButton>
        </div>
    );
};
