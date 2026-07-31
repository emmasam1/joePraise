import CustomerDashboardShell from "./_components/CustomerDashboardShell";

export const metadata = {
  title: "Customer Dashboard | JoePraise",
};

export default function CustomerDashboardLayout({ children }) {
  return <CustomerDashboardShell>{children}</CustomerDashboardShell>;
}
