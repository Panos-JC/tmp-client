import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";
import { Logo } from "../components/Logo/Logo";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { login } from "../redux/slices/auth/login";
import Router from "next/router";
import { fetchMovieData } from "../redux/slices/movie/actions/fetchMovieData";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | string[]>("");

  const { authenticated, error, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    error && setErrorMessage(error);
  }, [error]);

  useEffect(() => {
    if (authenticated) {
      Router.push("/");
      dispatch(fetchMovieData({ page: 1 }));
    }
  }, [authenticated]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Grid templateRows="1fr auto 1fr" gap={0} h="100vh" w="full">
      <Box w="100%" h="auto" />
      <VStack
        w="400px"
        bg="backgroundLight"
        rounded="lg"
        m="auto"
        p="10"
        alignItems="flex-start"
        spacing={10}
      >
        <Heading>Welcome</Heading>
        {errorMessage && (
          <Alert status="error" variant="solid">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <Input
            placeholder="Email"
            value={email}
            mb="2"
            onChange={handleEmailChange}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            mb="4"
          />
          <Button type="submit" size="lg" w="100%" disabled={loading}>
            Log In
          </Button>
        </form>
      </VStack>
      <Flex alignItems="flex-end" py="10" px="20">
        <chakra.div flexGrow={1}>
          <Logo />
        </chakra.div>
        <HStack spacing={10}>
          <Link>Privacy Policy</Link>
          <Link>Terms of Service</Link>
          <GoMarkGithub />
        </HStack>
      </Flex>
    </Grid>
  );
};

export default Login;
