
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const LoginButton = ({ variant = "default", size = "default" }: LoginButtonProps) => {
  const { loading, emailSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // For development, just redirect to dashboard without authentication
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleSignIn}
      disabled={loading}
    >
      <span className="flex items-center gap-2">
        <LogIn size={16} />
        Sign in
      </span>
    </Button>
  );
};

export default LoginButton;
