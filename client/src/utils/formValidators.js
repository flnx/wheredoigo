export const validateCategoriesOnSearch = (searchParams) => {
    const allowed = [
        'Beach',
        'Mountains',
        'Cultural',
        'Snow',
        'Islands',
        'Adventure',
    ];

    const enteredCategories = searchParams.getAll('category') || [];

    // Filters out the invalid / repeating categories
    const filteredCategories = enteredCategories
        .filter((x) => allowed.includes(x))
        .filter((value, index, self) => self.indexOf(value) === index); // Filter out repeating values

    return filteredCategories;
};
