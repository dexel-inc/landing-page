import React, { createContext, useContext, useMemo, useState } from "react";

const RouterContext = createContext(null);

const validRoutes = new Set(["/", "/servicios", "/contacto"]);

function normalizePath(pathname) {
  if (!pathname || pathname === "") return "/";
  const clean = pathname.replace(/\/+$/, "") || "/";
  return validRoutes.has(clean) ? clean : "/";
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  const navigate = (to) => {
    const nextPath = normalizePath(to);
    if (nextPath === path) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within RouterProvider");
  }
  return context;
}

export function Link({ to, children, onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    onClick?.(event);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
