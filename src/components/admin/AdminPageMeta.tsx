import { useEffect } from "react";

const AdminPageMeta = () => {
  useEffect(() => {
    const previousTitle = document.title;
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = robots?.content;
    const createdRobots = !robots;

    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }

    document.title = "Painel do blog | Bahdev";
    robots.content = "noindex, nofollow, noarchive";

    return () => {
      document.title = previousTitle;
      if (createdRobots) robots?.remove();
      else if (robots && previousRobots !== undefined) robots.content = previousRobots;
    };
  }, []);

  return null;
};

export default AdminPageMeta;
