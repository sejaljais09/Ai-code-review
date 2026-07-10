import Sidebar from "./sidebar";
import Header from "./header";

type DashboardLayoutProps = {
  children: React.ReactNode;
  name:string;
};

export default function DashboardLayout({
  children,
  name,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-1 flex-col">
        <Header name={name} />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}