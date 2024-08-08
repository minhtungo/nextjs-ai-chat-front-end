import { FC } from "react";

interface MainAreaProps {
  children: React.ReactNode;
}

const MainArea: FC<MainAreaProps> = ({ children }) => {
  return (
    <main className="relative flex h-screen w-full flex-1 flex-col overflow-auto pl-0 duration-300 ease-in-out animate-in lg:pl-[300px]">
      {children}
    </main>
  );
};

export default MainArea;
