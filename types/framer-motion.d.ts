declare module "framer-motion" {
  import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

  type MotionProps = {
    animate?: unknown;
    exit?: unknown;
    initial?: unknown;
    layout?: unknown;
    transition?: unknown;
    variants?: unknown;
    viewport?: unknown;
    whileHover?: unknown;
    whileInView?: unknown;
    whileTap?: unknown;
  };

  type MotionComponent<T extends ElementType> = (
    props: ComponentPropsWithoutRef<T> & MotionProps
  ) => ReactNode;

  export const motion: {
    a: MotionComponent<"a">;
    article: MotionComponent<"article">;
    aside: MotionComponent<"aside">;
    div: MotionComponent<"div">;
    span: MotionComponent<"span">;
  };

  export function AnimatePresence(props: { children?: ReactNode }): ReactNode;
}
