import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  QuestionIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  theme,
  Tr,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const MovieList: React.FC<MovieListProps> = ({ movies: propMovies }) => {
  const [sort, setSort] = useState<Sort>({ key: "title", ascending: true });
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState(propMovies);

  const sortFunction = useCallback(
    (a: Movie, b: Movie) => {
      const sortMultiplier = sort.ascending ? 1 : -1;
      if (sort.key === "title") {
        return a.title.localeCompare(b.title) * sortMultiplier;
      }
      if (sort.key === "onNetflix") {
        return ((a.onNetflix ? 1 : 0) - (b.onNetflix ? 1 : 0)) * sortMultiplier;
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
  }, [sort, search, movies]);

  useEffect(() => {
    async function fetchNetflix() {
      const total = movies.length;

      for (let idx = 0; idx < total; idx++) {
        const newMovies = movies.slice();
        const movie = movies[idx];

        try {
          const res = await fetch(`/api/justwatch?title=${movie.title}`);
          const json = await res.json();
          movie.onNetflix = json.onNetflix;
          movie.poster = json.poster;
        } catch {
          movie.onNetflix = null;
        }
        newMovies[idx] = movie;
        setMovies(newMovies);
      }
    }
    fetchNetflix();
  }, []);

  const renderNetflixStatus = (movie: Movie) => {
    if (movie.onNetflix === null) return <QuestionIcon />;
    if (movie.onNetflix === undefined) return <Spinner boxSize="0.75rem" />;
    if (!movie.onNetflix)
      return <CloseIcon boxSize="0.75rem" color={theme.colors.red[300]} />;
    return <CheckIcon color={theme.colors.green[300]} />;
  };

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
              onClick={() =>
                setSort({ key: "onNetflix", ascending: !sort.ascending })
              }
            >
              <Flex>
                {sort.key === "onNetflix" &&
                  (sort.ascending ? <ChevronUpIcon /> : <ChevronDownIcon />)}
                <Text>netflix</Text>
              </Flex>
            </Th>
            <Th
              _hover={{
                opacity: 0.75,
                cursor: "pointer",
              }}
              onClick={() =>
                setSort({ key: "title", ascending: !sort.ascending })
              }
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
              <Tr key={JSON.stringify(movie)}>
                <Td>{renderNetflixStatus(movie)}</Td>
                <Td>
                  <Flex alignItems="center">
                    {movie.poster && (
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        borderRadius={4}
                        w="5rem"
                        h="7rem"
                        mr="1rem"
                      />
                    )}

                    <Text>{titleCase(movie.title)}</Text>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MovieList;
