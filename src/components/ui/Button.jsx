import React from "react";

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 select-none";

const variantClasses = {
  primary:
    "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 dark:text-slate-900 shadow-[0_12px_30px_-14px_rgba(37,99,235,0.7)]",
  outline:
    "border border-slate-300 bg-white/70 text-slate-700 hover:bg-white dark:border-zinc-700 dark:bg-black/40 dark:text-gray-300 dark:hover:bg-black/60",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-gray-200 dark:hover:bg-zinc-800",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-zinc-800/70",
};

const sizeClasses = {
  xs: "h-7 px-2 text-[11px] uppercase tracking-wider",
  sm: "h-8 px-3 text-xs uppercase tracking-wider",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
  icon: "h-10 w-10 p-0",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  className,
  type,
  ...props
}) {
  const resolvedType = Component === "button" ? type ?? "button" : undefined;

  return (
    <Component
      type={resolvedType}
      className={joinClasses(baseClass, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
