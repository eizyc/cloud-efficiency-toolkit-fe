import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { Menu } from "./menu";


export const Navbar = () => {
  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
      <Logo />
      <Menu/>
      <div className="ml-auto">
        <Avatar className="size-10 hover:opcaity-75 transition">
            <AvatarFallback className="bg-blue-500 font-medium text-white flex items-center justify-center">
              {"A".charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
