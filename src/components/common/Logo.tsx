import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <span className="pointer-events-none select-none text-xl font-semibold text-primary">
      Lumi
    </span>
  );
};

export default Logo;
