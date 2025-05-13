
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

interface LoginButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const LoginButton = ({ variant = "default", size = "default" }: LoginButtonProps) => {
  const { loading } = useAuth();

  const handleSignIn = async () => {
    // Temporarily disabled Google auth
    alert("Google authentication is temporarily disabled. Please use email/password or phone authentication.");
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleSignIn}
    >
      <span className="flex items-center gap-2">
        <LogIn size={16} />
        Sign in
      </span>
    </Button>
  );
};

export default LoginButton;
