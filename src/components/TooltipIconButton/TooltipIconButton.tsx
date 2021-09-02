import { IconButton, SkeletonCircle, Tooltip } from "@chakra-ui/react";
import React from "react";

interface ITooltipIconButtonProps {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  label: string;
  variant?: "primary" | "solid";
  isLoading?: boolean;
  onClick?: () => void;
  mr?: number;
}

export const TooltipIconButton: React.FC<ITooltipIconButtonProps> = props => {
  const {
    icon,
    label,
    variant = "solid",
    isLoading = false,
    onClick,
    mr = 0,
  } = props;

  return (
    <>
      {isLoading ? (
        <SkeletonCircle size="32px" mr="3" />
      ) : (
        <Tooltip label={label}>
          <IconButton
            isLoading={isLoading}
            variant={variant}
            aria-label={label}
            size="sm"
            icon={icon}
            mr={mr}
            onClick={onClick}
          />
        </Tooltip>
      )}
    </>
  );
};
