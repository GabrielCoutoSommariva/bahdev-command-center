import { useQuery } from "@tanstack/react-query";
import { blogPosts } from "@/lib/blog";
import { fetchPublishedBlogPosts } from "@/lib/blog-repository";

export const useBlogPosts = () =>
  useQuery({
    queryKey: ["blog-posts", "published"],
    queryFn: fetchPublishedBlogPosts,
    placeholderData: blogPosts,
    staleTime: 60_000,
    retry: 1,
  });
