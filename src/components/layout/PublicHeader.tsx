import Logo from "@/components/common/Logo";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import HeaderButtons from "@/components/public/common/HeaderButtons";
import HeaderLinks from "@/components/public/common/HeaderLinks";
import Link from "next/link";

const PublicHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-50">
      <div className="relative h-14 w-full border-b border-border/50 bg-card/80 backdrop-blur-sm transition-opacity">
        <MaxWidthWrapper className="flex h-full items-center justify-between">
          <div className="w-2/12">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <HeaderLinks />
          <HeaderButtons />
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default PublicHeader;
