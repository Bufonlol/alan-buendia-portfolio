"use client";

import { useApp } from "@/components/AppShell";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

/** Internal link routed through the block-wipe page transition. */
export default function TLink({ href, children, onClick, ...rest }: Props) {
  const { navigate } = useApp();
  const router = useRouter();

  useEffect(() => {
    const path = href.split("#")[0];
    if (path.startsWith("/")) router.prefetch(path || "/");
  }, [href, router]);

  return (
    <a
      href={href}
      onClick={(e) => {
        // let modified clicks (new tab, etc.) behave natively
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
