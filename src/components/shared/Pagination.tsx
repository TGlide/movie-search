import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useCallback } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  changePage: (newPage: number) => void;
  pageNeighbours?: number;
};

export const Dots = (): JSX.Element => (
  <Text as="span" variant="14" mr={2} px={2}>
    ...
  </Text>
);

export const Pagination = ({
  currentPage,
  totalPages,
  changePage,
  pageNeighbours = 1,
  ...props
}: Props): JSX.Element => {
  const renderNumberButtons = useCallback(() => {
    const allPages = new Array(totalPages).fill("");

    let leftDots = currentPage - pageNeighbours - 1;
    if (leftDots <= 1) leftDots = 0;

    let rightDots = currentPage + pageNeighbours + 1;
    if (rightDots >= totalPages) rightDots = Infinity;

    return allPages.map((_, i) => {
      const page = i + 1;
      const isCurrent = page === currentPage;
      if (
        page === 1 ||
        page === totalPages ||
        (page > leftDots && page < rightDots)
      )
        return (
          <Button
            key={i}
            aria-label={`${page}`}
            disabled={isCurrent}
            onClick={() => changePage(page)}
            mr={2}
          >
            {page}
          </Button>
        );
      if (page === leftDots || page === rightDots) return <Dots />;

      return null;
    });
  }, [changePage, currentPage, pageNeighbours, totalPages]);

  return (
    <Box my={4} {...props}>
      <Flex>
        <IconButton
          aria-label="Previous Page"
          icon={<ChevronLeftIcon />}
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          mr={2}
        />
        {renderNumberButtons()}
        <IconButton
          aria-label="Next Page"
          icon={<ChevronRightIcon />}
          disabled={currentPage === totalPages || totalPages == 0}
          onClick={() => changePage(currentPage + 1)}
        />
      </Flex>
    </Box>
  );
};
