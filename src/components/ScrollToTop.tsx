import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const timeouts: number[] = [];

    if (hash) {
      const id = hash.slice(1);
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, left: 0 });
        }
      };

      requestAnimationFrame(scrollToHash);
      timeouts.push(window.setTimeout(scrollToHash, 150));
      timeouts.push(window.setTimeout(scrollToHash, 500));
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
