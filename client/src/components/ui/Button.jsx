import { HiArrowRight } from "react-icons/hi2";

const variants = {
  black: "bg-ink text-white hover:bg-neutral-800",
  white: "bg-white text-ink hover:bg-neutral-100",
  lime: "bg-lime text-ink hover:brightness-95",
  gray: "bg-mist text-ink hover:bg-line",
  outline: "bg-white text-ink ring-1 ring-inset ring-ink/80 hover:bg-mist",
  ghost: "bg-white/70 text-ink ring-1 ring-inset ring-line hover:bg-white",
  accent: "text-white hover:brightness-110",
};

const sizes = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-4 text-[15px] gap-2",
  lg: "h-12 px-5 text-base gap-2",
};

const Button = ({ href, children, variant = "black", size = "md", arrow = true, accent, className = "", ...props }) => {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-medium transition-[background,filter,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${variants[variant]} ${sizes[size]} ${className}`}
      style={accent ? { backgroundColor: accent } : undefined}
      {...props}
    >
      {children}
      {arrow && <HiArrowRight aria-hidden className="size-[1em] transition-transform duration-200 group-hover:translate-x-0.5" />}
    </a>
  );
};

export default Button;
