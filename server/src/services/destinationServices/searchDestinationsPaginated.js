const Destination = require('../../models/destinationSchema');
const paginatedSearchPipeline = require('../../pipelines/paginatedSearchPipeline');
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { validateCategories } = require('../../utils/validateFields');

async function searchDestinationsPaginated(page, limit, searchParams, categories) {
    let regex = new RegExp(searchParams, 'i');

    const filteredCategories = validateCategories(categories);
    const { countPipeline, dataPipeline } = paginatedSearchPipeline(
        filteredCategories,
        page,
        limit,
        regex
    );

    const countPromise = Destination.aggregate(countPipeline).exec();
    const dataPromise = Destination.aggregate(dataPipeline).exec();

    const [countResult, destinations] = await Promise.all([
        countPromise,
        dataPromise,
    ]);

    // Extract the total count from the count result
    const countAll = countResult[0] ? countResult[0].total : 0;

    // Capitalize the city and country name
    destinations.forEach((x) => {
        x.city = capitalizeEachWord(x.city);
        x.country = capitalizeEachWord(x.country.name);
    });

    // Calculate if there is a next page
    const hasNextPage = page + limit < countAll;

    // Calculate the next page number if it exists
    const nextPage = hasNextPage ? page + limit : null;

    // Return the paginated data and nextPage number
    return [destinations, nextPage];
}

module.exports = searchDestinationsPaginated;
