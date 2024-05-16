import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return <span className="text-lg font-semibold text-blue-500">Lumi</span>;
};

export default Logo;
