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
  VStack,
  Link,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { GoMarkGithub } from "react-icons/go";
import { Logo } from "../components/Logo/Logo";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { register } from "../redux/slices/auth/register";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
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
    }
  }, [authenticated]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ email, password, username }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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
            placeholder="Username"
            value={username}
            mb="2"
            onChange={handleUsernameChange}
          />
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
            Register
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

export default Register;
