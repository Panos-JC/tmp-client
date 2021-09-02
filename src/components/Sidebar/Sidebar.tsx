import React from "react";
import { VStack, Text, Button, useBreakpointValue } from "@chakra-ui/react";
import { MdTv, MdHome, MdMovie } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const buttonSize = useBreakpointValue({ base: "lg", sm: "md", md: "md" });
  const router = useRouter();
  return (
    <VStack spacing="3" alignItems="flex-start">
      <Text fontSize="small" color="gray.600">
        Categories
      </Text>
      <Link href="/">
        <Button
          leftIcon={<MdHome />}
          variant={router.pathname === "/" ? "menuActive" : "menu"}
          minW={{ base: "full", lg: "3xs" }}
          size={buttonSize}
        >
          Home
        </Button>
      </Link>

      <Link href="/movie">
        <Button
          leftIcon={<MdMovie />}
          variant={router.pathname === "/movies" ? "menuActive" : "menu"}
          minW={{ base: "full", lg: "3xs" }}
          size={buttonSize}
        >
          Movies
        </Button>
      </Link>
      <Link href="/tv">
        <Button
          leftIcon={<MdTv />}
          variant={router.pathname === "/tv" ? "menuActive" : "menu"}
          minW={{ base: "full", lg: "3xs" }}
          size={buttonSize}
        >
          Tv Shows
        </Button>
      </Link>
    </VStack>
  );
};
