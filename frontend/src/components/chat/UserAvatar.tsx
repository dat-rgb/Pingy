import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface IUserAvatarProps {
  type: "sidebar" | "chat" | "profile";
  name: string;
  avatarUrl?: string;
  className?: string;
}

const UserAvatar = ({ type, name, avatarUrl, className }: IUserAvatarProps) => {
  const displayName = name || "Pingy";

  return (
    <Avatar
      className={cn(
        className,
        type === "sidebar" && "size-12 text-base",
        type === "chat" && "size-8 text-sm",
        type === "profile" && "size-24 text-3xl shadow-md"
      )}
    >
      <AvatarImage src={avatarUrl} alt={displayName} />
      <AvatarFallback
        className={cn(
          !avatarUrl && "bg-blue-500",
          "text-white font-bold"
        )}
      >
        {displayName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
