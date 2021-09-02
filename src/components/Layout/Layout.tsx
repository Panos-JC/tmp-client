import {
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Grid,
  GridItem,
  IconButton,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { ImMenu } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toggleOpen } from "../../redux/slices/drawer/drawerSlice";
import { Logo } from "../Logo/Logo";
import { Sidebar } from "../Sidebar/Sidebar";
import { Topbar } from "../Topbar/Topbar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(state => state.drawer.isOpen);

  const handleOpen = () => {
    dispatch(toggleOpen());
  };

  const onClose = () => {
    dispatch(toggleOpen());
  };

  const lgLayout = (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
      gap={6}
      p={{ base: 2, lg: 6 }}
      pr={{ base: "0px", lg: "64px" }}
    >
      <GridItem rowSpan={1} colSpan={1}>
        <chakra.div>
          <Flex justifyContent="center">
            <Logo />
          </Flex>
        </chakra.div>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4}>
        <Topbar />
      </GridItem>
      <GridItem rowSpan={2} colSpan={1}>
        <Flex justifyContent="center">
          <Sidebar />
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={4}>
        {children}
      </GridItem>
    </Grid>
  );

  const mdLayout = (
    <>
      <Grid
        templateColumns={{ base: "1fr" }}
        gap={6}
        p={{ base: 2, lg: 6 }}
        pr={{ base: "0px", lg: "64px" }}
      >
        <GridItem rowSpan={1} colSpan={4}>
          <Topbar />
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          {children}
        </GridItem>
      </Grid>

      <Drawer onClose={onClose} placement="bottom" isOpen={isOpen} size="full">
        <DrawerContent pt="16">
          <DrawerCloseButton
            top="initial"
            bottom="5"
            right="5"
            size="lg"
            bg="backgroundLight"
          />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <IconButton
        variant="primary"
        aria-label="Menu"
        size="lg"
        icon={<ImMenu />}
        pos="fixed"
        bottom={4}
        right={4}
        onClick={handleOpen}
      />
    </>
  );

  const smLayout = (
    <>
      <Grid
        templateRows={{ base: "repeat(1, auto)", lg: "repeat(3, auto)" }}
        templateColumns={{ base: "1fr", lg: "repeat(5, 1fr)" }}
        gap={{ base: 3, lg: 6 }}
        p={{ base: 3, lg: 6 }}
        pr={{ base: 3, lg: "64px" }}
      >
        <GridItem rowSpan={1} colSpan={4}>
          <Topbar />
        </GridItem>
        <GridItem rowSpan={1} colSpan={4}>
          {children}
        </GridItem>
      </Grid>

      <Drawer onClose={onClose} placement="bottom" isOpen={isOpen} size="full">
        <DrawerContent pt="16">
          <DrawerCloseButton
            top="initial"
            bottom="5"
            right="5"
            size="lg"
            bg="backgroundLight"
          />
          <DrawerHeader>
            <Logo />
          </DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <IconButton
        variant="primary"
        aria-label="Menu"
        size="lg"
        icon={<ImMenu />}
        pos="fixed"
        bottom={4}
        right={4}
        onClick={handleOpen}
      />
    </>
  );

  const layout = useBreakpointValue({
    base: smLayout,
    md: mdLayout,
    lg: lgLayout,
  });

  return <>{layout}</>;
};
