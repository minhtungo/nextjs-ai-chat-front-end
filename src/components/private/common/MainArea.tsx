import { FC } from "react";

interface MainAreaProps {
  children: React.ReactNode;
}

const MainArea: FC<MainAreaProps> = ({ children }) => {
  return (
    <main className="relative flex h-screen w-full flex-1 flex-col overflow-auto">
      {children}
    </main>
  );
};

export default MainArea;
