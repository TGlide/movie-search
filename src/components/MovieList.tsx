import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  theme,
  Tr,
} from "@chakra-ui/react";
import React, { useCallback, useMemo, useState } from "react";
import { Movie } from "../entities/Movie";
import { titleCase } from "../utils/titleCase";
import { twoWayBind } from "../utils/twoWayBind";

type MovieListProps = {
  movies: Movie[];
};

type Sort = {
  key: keyof Movie;
  ascending: boolean;
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [sort, setSort] = useState<Sort>({ key: "title", ascending: true });
  const [search, setSearch] = useState("");

  const sortFunction = useCallback(
    (a: Movie, b: Movie) => {
      const sortMultiplier = sort.ascending ? 1 : -1;
      if (sort.key === "title") {
        return a.title.localeCompare(b.title) * sortMultiplier;
      }
      return 0;
    },
    [sort]
  );

  const sortedMovies = useMemo(() => {
    return movies
      .sort(sortFunction)
      .filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [sort, search]);

  return (
    <Box py={8}>
      <FormControl>
        <InputGroup>
          <Input
            variant="flushed"
            placeholder="Movie name"
            {...twoWayBind(search, setSearch)}
          />
          <InputRightElement children={<SearchIcon />} />
        </InputGroup>
      </FormControl>
      <Table mt={6}>
        <Thead>
          <Tr>
            <Th
              _hover={{
                opacity: 0.75,
                cursor: "pointer",
              }}
            >
              Netflix
            </Th>
            <Th
              _hover={{
                opacity: 0.75,
                cursor: "pointer",
              }}
              onClick={() => setSort({ ...sort, ascending: !sort.ascending })}
            >
              <Flex>
                {sort.key === "title" &&
                  (sort.ascending ? <ChevronUpIcon /> : <ChevronDownIcon />)}
                <Text>Title</Text>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedMovies.map((movie) => {
            return (
              <Tr key={movie.title}>
                <Td>
                  <CloseIcon boxSize="0.75rem" color={theme.colors.red[300]} />
                </Td>
                <Td>{titleCase(movie.title)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MovieList;
