import { cn } from "@/lib/utils";

const Container = ({
  className,
  children,
  tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  tag?: "div" | "main";
}) => {
  const Tag = tag ? tag : "div";
  return (
    <Tag
      className={cn("mx-auto w-full max-w-screen-xl px-4 sm:px-6", className)}
    >
      {children}
    </Tag>
  );
};

export default Container;
