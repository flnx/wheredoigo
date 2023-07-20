const Destination = require('../../models/destinationSchema');
const Country = require('../../models/countrySchema');

// Services
const uploadImages = require('../cloudinaryService/uploadImages');

async function createDestination(data, images, user) {

    throw new Error('user');
    const { ownerId } = user;

    const country = await addCountry(data.country);

    const destination = new Destination({
        ...data,
        ownerId,
        country: country._id,
        imageUrls: [],
        likes: [],
    });

    await destination.save();

    const folderName = 'destinations';
    const { imageUrls, imgError } = await uploadImages(
        images,
        destination,
        folderName,
        4
    );

    destination.imageUrls = imageUrls;
    await destination.save();

    return {
        _id: destination._id,
        imgError,
    };

    async function addCountry(countryName) {
        // looks for the country

        let checkCountryInDB = await Country.findOne({
            name: countryName.toLowerCase(),
        })
            .lean()
            .exec();

        // checks if the country already exists. If not, it adds it
        if (!checkCountryInDB) {
            checkCountryInDB = await Country.create({ name: countryName });
        }

        return checkCountryInDB;
    }
}

module.exports = createDestination;
