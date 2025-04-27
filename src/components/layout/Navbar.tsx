
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, BookOpenIcon, MenuIcon, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b border-spark-light bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="h-6 w-6 text-spark-primary" />
            <span className="text-xl font-bold">SparkLearn</span>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-6">
            <a href="#" className="text-sm font-medium hover:text-spark-primary transition-colors">Dashboard</a>
            <a href="#" className="text-sm font-medium hover:text-spark-primary transition-colors">Library</a>
            <a href="#" className="text-sm font-medium hover:text-spark-primary transition-colors">Study Plans</a>
            <a href="#" className="text-sm font-medium hover:text-spark-primary transition-colors">Progress</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input 
              type="search"
              placeholder="Search your materials..." 
              className="pl-10 pr-4 py-2 rounded-full border border-spark-light focus:outline-none focus:ring-2 focus:ring-spark-primary text-sm w-64" 
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-spark-primary"></span>
          </Button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-spark-secondary text-white">SL</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
