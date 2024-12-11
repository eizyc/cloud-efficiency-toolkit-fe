import { Navbar } from "./navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return ( 
    <div className="bg-muted flex flex-col h-screen">
      <Navbar />
      <main className="bg-white flex-1 flex flex-col overflow-scroll p-8 rounded-t-2xl">
        {children}
      </main>
    </div>
  );
};
 
export default DashboardLayout;
