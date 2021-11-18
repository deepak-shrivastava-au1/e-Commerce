import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {

  const { pathname } = useLocation();

  // INFO useEffect hook to auto scroll to top of the page after every pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;