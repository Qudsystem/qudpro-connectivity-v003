import { Post, Comment } from "@/types";
import PostCard from "./PostCard";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PostListProps {
  posts: Post[];
  onLike: (postId: number) => void;
  onDelete: (postId: number) => void;
  likedPosts: number[];
}

const PostList = ({ posts, onLike, onDelete, likedPosts }: PostListProps) => {
  const navigate = useNavigate();

  const handleComment = (postId: number, comment: Comment) => {
    // Find the post and add the comment
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments = [comment, ...post.comments];
      toast({
        description: "تم إضافة التعليق بنجاح",
        duration: 2000,
      });
    }
  };

  const handleShare = (postId: number) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    toast({
      description: "تم نسخ رابط المنشور",
      duration: 2000,
    });
  };

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={onLike}
          onComment={handleComment}
          onShare={handleShare}
          onProfileClick={handleProfileClick}
          isLiked={likedPosts.includes(post.id)}
        />
      ))}
    </div>
  );
};

export default PostList;