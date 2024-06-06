export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  // if the pages is equal or less than 7, return an array of the total pages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  // If the current page is between the first 3 pages, return the first 3,
  // suspensive points and the last two pages
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }
  // If the current page is between the last 3 pages, return the last 3,
  // suspensive points and the first two pages
  if (currentPage > totalPages - 3) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  // if the current page is somewhere in the middle, return the first page,
  // suspensive points, the current page, suspensive points and the last page
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}
