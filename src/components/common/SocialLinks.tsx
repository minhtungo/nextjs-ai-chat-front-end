import Hint from "@/components/common/Hint";
import { SOCIAL_LINKS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SocialLinksProps extends React.ComponentProps<"div"> {}

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={cn("flex items-center gap-x-5", className)}>
      {SOCIAL_LINKS.map(({ title, href, icon }) => (
        <Hint label={title} key={`social-footer-${title}`}>
          <Link
            href={href}
            className="text-muted-foreground hover:text-primary"
          >
            {icon}
          </Link>
        </Hint>
      ))}
    </div>
  );
};

export default SocialLinks;
