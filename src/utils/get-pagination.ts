export const DEFAULT_PER_PAGE = 10;

export const getPagination = (
  page = 0,
  limit = DEFAULT_PER_PAGE,
  totalCount: number
) => {
  const totalPages = Math.ceil(totalCount / limit);

  return {
    skip: page * limit,
    take: limit,
    meta: {
      totalPages,
      page: page + 1,
      limit,
      count: totalCount,
    },
  };
};
