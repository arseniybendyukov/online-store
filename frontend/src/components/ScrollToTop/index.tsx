import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavPaths } from "../../navigation";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== NavPaths.CATALOG) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
