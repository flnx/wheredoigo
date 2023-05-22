const Destination = require('../../models/destinationSchema');

async function dislikeDestination(id, userId) {
    const result = await Destination.updateOne(
      { _id: id },
      { $pull: { likes: { userId } } }
    );
  
    return result;
  }

module.exports = dislikeDestination;
