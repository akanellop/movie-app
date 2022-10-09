function getSortingForListing(sortingValue) {
  const SORTING_STAGE = {
    date: { createdAt: -1 },
    likes: { countOfLikes: -1 },
    hates: { countOfHates: -1 },
  };
  return SORTING_STAGE[sortingValue];
}

function formatDateOfCreation(date) {
  return date.toISOString().replace(/T/, " ").replace(/\..+/, "");
}

module.exports = { getSortingForListing, formatDateOfCreation };
