import Logo from "../Logo/Logo";
import { SidebarRoutes } from "../SidebarRoutes";

export default function Sidebar() {
  return (
    <>
      <div className="py-6">
        <Logo />
      </div>
      <SidebarRoutes />
    </>
  );
}
