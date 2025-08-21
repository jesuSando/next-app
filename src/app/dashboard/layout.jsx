import Navbar from "@/components/navbar/navbar";

export default function DashboardLayout({ children }) {
    return (
      <div className="flex">
        <div className="flex flex-col flex-1">
          <Navbar />
          {children}
        </div>
      </div>
    );
  }