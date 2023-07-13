export const likedByMessage = ({ lastUserLikes, likesCount }) => {
    if (lastUserLikes) {
        const lastUsernameLike = lastUserLikes
            ?.slice(0, 3)
            .at(-1)
            .username?.slice(0, 12);

        const totalLikesWithoutLastOne = likesCount - 1;
        const likedByOtherMsg = likesCount - 1 == 1 ? 'other' : 'others';
        const likedByMessage = `Liked By ${lastUsernameLike} and ${totalLikesWithoutLastOne} ${likedByOtherMsg}`;

        return likedByMessage;
    }

    return null;
};
