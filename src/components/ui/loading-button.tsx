import * as React from "react";
import { Button, buttonVariants } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "./utils";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean;
};

export function LoadingButton({
  isLoading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={isLoading || props.disabled}
      className={cn("inline-flex items-center gap-2", className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin w-4 h-4" aria-hidden />
      ) : null}
      {children}
    </Button>
  );
}

export default LoadingButton;
