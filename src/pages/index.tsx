import { Flex, Text, useTheme, color } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { themeObj } from "../theme";

const Index = () => {
  const theme = useTheme<typeof themeObj>();
  return (
    <Container height="100vh">
      <Flex justifyContent="space-around" align="center" width="100%" py={4}>
        <Text fontSize="xl" fontWeight="700" color={theme.colors.red[400]}>
          Movie Search
        </Text>
        <DarkModeSwitch />
      </Flex>
    </Container>
  );
};

export default Index;
