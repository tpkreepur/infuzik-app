"use client";

import Button from "@/components/Button";
// import { Badge } from "../../ui/badge";
// import { ArrowRightIcon } from "lucide-react";
// import { Section } from "../../ui/section";
import { Mockup, MockupFrame } from "../../ui/mockup";
import Glow from "../../ui/glow";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
// import Github from "../../logos/github";

export default function Hero() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/static/images/app-preview.png";
      break;
    case "dark":
      src = "/static/images/app-preview.png";
      break;
    default:
      src = "/static/images/app-preview.png";
      break;
  }

  return (
    <section className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0">
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* <Badge variant="outline" className="animate-appear">
            <span className="text-muted-foreground">
              New version of Launch UI is out!
            </span>
            <Link href="/" className="flex items-center gap-1">
              Get started
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </Badge> */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight dark:to-muted-foreground">
            Elevate Your
            <br />
            Mental State
          </h1>
          <p className="text-md relative z-10 max-w-[550px] animate-appear text-muted-foreground opacity-1 delay-100 sm:text-xl">
            Let Infuzik entrain your brain to the perfect frequency for focus,
            relaxation, or sleep.
          </p>
          <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-1 delay-300">
            <div className="relative z-10 flex animate-appear justify-center gap-4 opacity-1 delay-300">
              <Button variant="primary">
                <Link href="/">Get Started</Link>
              </Button>
              {/* <Button variant="glow" size="lg" asChild>
                <Link href="/">
                  <Github className="mr-2 h-4 w-4" /> Github
                </Link>
              </Button> */}
            </div>
          </div>
          <div className="relative pt-12">
            <MockupFrame
              className="animate-appear opacity-1 delay-700"
              size="small"
            >
              <Mockup type="responsive">
                <Image
                  src={src}
                  alt="Launch UI app screenshot"
                  width={400}
                  height={765}
                />
              </Mockup>
            </MockupFrame>
            <Glow
              variant="top"
              className="animate-appear-zoom opacity-1 delay-1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
