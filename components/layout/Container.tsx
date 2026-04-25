import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "article" | "main" | "aside" | "header" | "footer" | "nav";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: ContainerTag;
}

/**
 * Wraps content with consistent horizontal padding and max-width.
 * Use this instead of manually adding `container mx-auto px-4` in every section.
 */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("page-container", className)}>
      {children}
    </Tag>
  );
}
