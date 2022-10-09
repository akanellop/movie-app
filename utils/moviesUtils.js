function getSortingForListing(sortingValue) {
  const SORTING_STAGE = {
    date: { createdAt: -1 },
    likes: { numberOfLikes: -1 },
    hates: { numberOfHates: -1 },
  };
  return SORTING_STAGE[sortingValue];
}

module.exports = { getSortingForListing };
