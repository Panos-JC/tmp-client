import {
  Avatar,
  Button,
  chakra,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ImMenu } from "react-icons/im";
import { useAppDispatch } from "../../hooks/hooks";
import { logout } from "../../redux/slices/auth/authSlice";
import { toggleOpen } from "../../redux/slices/drawer/drawerSlice";
import { Logo } from "../Logo/Logo";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.getItem("user")
      ? setAuthenticated(true)
      : setAuthenticated(false);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${value}`);
    }
  };

  const handleOpen = () => {
    dispatch(toggleOpen());
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    router.reload();
  };

  return (
    <>
      <HStack spacing={{ base: 3, lg: 3 }} align="center">
        <chakra.div display={{ base: "inherit", lg: "none" }}>
          <Logo />
        </chakra.div>

        <Input
          value={value}
          onChange={onChange}
          onKeyPress={onEnterPress}
          ref={inputRef}
          variant="filled"
          placeholder="Search"
          bg="backgroundLight"
          boxShadow="high"
        />
        {authenticated ? (
          <Menu>
            <MenuButton>
              <Avatar />
            </MenuButton>
            <MenuList>
              <Link href="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>

              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Link href="/login">
              <Button variant="primary" shadow="md" minW="4xs">
                Login
              </Button>
            </Link>

            <Link href="/register">
              <Button minW="4xs">Sign Up</Button>
            </Link>
          </>
        )}
      </HStack>
    </>
  );
};
