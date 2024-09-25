import TooltipContainer from "@/components/common/TooltipContainer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SOCIAL_LINKS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SocialLinksProps extends React.ComponentProps<"div"> {}

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn("flex items-center gap-x-5", className)}>
        {SOCIAL_LINKS.map(({ title, href, icon }) => (
          <TooltipContainer content={title} key={`social-footer-${title}`}>
            <Link
              href={href}
              className="text-muted-foreground hover:text-primary"
            >
              {icon}
            </Link>
          </TooltipContainer>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialLinks;
