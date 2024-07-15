import { FC } from "react";
import ChatOverlayView from "../chat/[id]/components/ChatOverlayView";

interface pageProps {}

const page: FC<pageProps> = () => {
  // return <ImageMasker imageUrl="/images/intro-block-1.webp" />;
  return <ChatOverlayView imageSrc="/images/intro-block-1.webp" />;
};

export default page;
