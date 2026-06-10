import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_KEY = "bahdev:spa-redirect";

const SpaRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const target = sessionStorage.getItem(REDIRECT_KEY);

    if (!target) return;

    sessionStorage.removeItem(REDIRECT_KEY);
    navigate(target, { replace: true });
  }, [navigate]);

  return null;
};

export default SpaRedirectHandler;
