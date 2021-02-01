import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import MovieList from "../components/MovieList";
import { Movie } from "../entities/Movie";
import { useCustomTheme } from "../theme";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [listUrl, setListUrl] = useState("");
  const [movies, setMovies] = useState<Movie[] | undefined>();

  const theme = useCustomTheme();

  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`/api/letterboxd?url=${listUrl}`);
      console.log("res", res);

      const json = await res.json();
      // should detect error
      setMovies(json.movies);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" height="100vh">
      <Flex justifyContent="space-between" align="center" width="100%" py={4}>
        <Text fontSize="xl" fontWeight="700" color={theme.colors.red[400]}>
          Movie Search
        </Text>
        <DarkModeSwitch />
      </Flex>
      <form onSubmit={search}>
        <FormControl>
          <FormLabel>Letterboxd list url</FormLabel>
          <Input onChange={(e) => setListUrl(e.target.value)} value={listUrl} />
        </FormControl>
        <Flex justify="center" mt={4}>
          <Button
            colorScheme="red"
            variant="solid"
            isLoading={loading}
            type="submit"
          >
            Search
          </Button>
        </Flex>
      </form>
      {movies && <MovieList movies={movies} />}
    </Container>
  );
};

export default Index;
