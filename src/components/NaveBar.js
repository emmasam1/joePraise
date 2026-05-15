// "use client";
// import React, { useState } from "react";
// import { Button, Drawer } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; // Import this

// const NaveBar = () => {
//   const [open, setOpen] = useState(false);
//   const pathname = usePathname(); // Get current path (e.g., "/" or "/pricing")

//   const navLinks = [
//     { label: "Home", path: "/" },
//     { label: "Pricing", path: "/pricing" },
//     { label: "Support", path: "/support" },
//     { label: "Who We Are", path: "/who-we-are" },
//     { label: "List Your Business", path: "/list-your-business" },
//   ];

//   return (
//     <section className="w-full bg-white px-6 py-4 md:px-12 ">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         {/* Logo Section */}
//         <Link href="/" className="flex items-center gap-2 cursor-pointer">
//           <img src="/images/logo_sm.png" alt="Logo" className="h-10 w-auto" />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden lg:flex items-center gap-10">
//           {navLinks.map((link) => {
//             // Check if current path matches the link path
//             const isActive = pathname === link.path;

//             return (
//               <Link
//                 key={link.label}
//                 href={link.path}
//                 className={`text-[15px] font-medium transition-colors ${
//                   isActive
//                     ? "text-black font-semibold" // Active style
//                     : "text-gray-400 hover:text-[#060853]" // Inactive style
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Auth Buttons */}
//         <div className="hidden lg:flex items-center gap-4">
//           <Link href="business-registration">
//             <Button className="h-12 px-12! border-[#060853]! text-[#060853]! font-bold rounded-xl hover:bg-gray-50">
//               Register
//             </Button>
//           </Link>
//           <Link href="/login">
//             <Button className="h-12 px-12! bg-[#060853]! text-white! font-bold rounded-xl border-none hover:bg-[#0a0d6b]!">
//               Sign in
//             </Button>
//           </Link>
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           className="lg:hidden text-2xl text-[#060853]"
//           onClick={() => setOpen(true)}
//         >
//           <MenuOutlined />
//         </button>
//       </div>

//       {/* Mobile Sidebar */}
//       <Drawer
//         placement="right"
//         onClose={() => setOpen(false)}
//         open={open}
//         size={280}
//       >
//         <div className="flex flex-col gap-6 pt-4">
//           {navLinks.map((link) => {
//             const isActive = pathname === link.path;
//             return (
//               <Link
//                 key={link.label}
//                 href={link.path}
//                 onClick={() => setOpen(false)}
//                 className={`text-lg font-bold ${isActive ? "text-[#060853]" : "text-gray-400"}`}
//               >
//                 {link.label}
//               </Link>
//             );
//           })}
//         </div>
//       </Drawer>
//     </section>
//   );
// };

// export default NaveBar;


"use client";
import React, { useState } from "react";
import { Button, Drawer, Dropdown, Avatar, Space } from "antd";
import { 
  MenuOutlined, 
  UserOutlined, 
  SettingOutlined, 
  BellOutlined, 
  LogoutOutlined, 
  AppstoreOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const NaveBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Get Auth State
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Pricing", path: "/pricing" },
    { label: "Support", path: "/support" },
    { label: "Who We Are", path: "/who-we-are" },
    { label: "List Your Business", path: "/list-your-business" },
  ];

  // Dropdown Menu Items
  const profileMenuItems = [
    {
      key: 'header',
      label: (
        <div className="px-2 py-1">
          <p className="font-bold text-[#060853] m-0">{user?.name}</p>
          <p className="text-xs text-gray-400 m-0">{user?.email}</p>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'dashboard',
      label: <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'}>My Dashboard</Link>,
      icon: <AppstoreOutlined />,
      // Only show dashboard link if they aren't a basic 'user'
      disabled: user?.role === 'user' 
    },
    {
      key: 'profile',
      label: <Link href="/profile">Profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: 'cart',
      label: <Link href="/cart">My Cart</Link>,
      icon: <ShoppingCartOutlined />,
    },
    {
      key: 'notifications',
      label: <Link href="/notifications">Notifications</Link>,
      icon: <BellOutlined />,
    },
    {
      key: 'settings',
      label: <Link href="/settings">Settings</Link>,
      icon: <SettingOutlined />,
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <section className="w-full bg-white px-6 py-4 md:px-12 border-b border-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/images/logo_sm.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.label}
                href={link.path}
                className={`text-[15px] font-medium transition-colors ${
                  isActive
                    ? "text-black font-semibold"
                    : "text-gray-400 hover:text-[#060853]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Section */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            /* SHOW PROFILE ICON WHEN AUTHENTICATED */
            <Dropdown 
              menu={{ items: profileMenuItems }} 
              trigger={['click']} 
              placement="bottomRight"
              overlayClassName="w-56"
            >
              <div className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar 
                  size={45} 
                  src={user?.avatar?.url} 
                  icon={!user?.avatar?.url && <UserOutlined />} 
                  className="border-2 border-[#15BE87]"
                />
              </div>
            </Dropdown>
          ) : (
            /* SHOW LOGIN/REGISTER WHEN NOT AUTHENTICATED */
            <>
              <Link href="/business-registration">
                <Button className="h-12 px-8! border-[#060853]! text-[#060853]! font-bold rounded-xl hover:bg-gray-50">
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button className="h-12 px-8! bg-[#060853]! text-white! font-bold rounded-xl border-none hover:bg-[#0a0d6b]!">
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-[#060853]"
          onClick={() => setOpen(true)}
        >
          <MenuOutlined />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <Drawer
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={280}
      >
        <div className="flex flex-col gap-6 pt-4">
          {isAuthenticated && (
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
               <Avatar 
                  size={50} 
                  src={user?.avatar?.url} 
                  icon={<UserOutlined />} 
                  className="border-2 border-[#15BE87]"
                />
                <div>
                  <p className="font-bold text-[#060853] m-0 text-base">{user?.name}</p>
                  <p className="text-xs text-gray-400 m-0">Verified Account</p>
                </div>
            </div>
          )}

          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`text-lg font-bold ${isActive ? "text-[#15BE87]" : "text-[#060853]"}`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-4">
            {isAuthenticated ? (
              <Button 
                danger 
                icon={<LogoutOutlined />} 
                onClick={() => { handleLogout(); setOpen(false); }}
                className="font-bold h-11"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full h-11 font-bold">Login</Button>
                </Link>
                <Link href="/business-registration" onClick={() => setOpen(false)}>
                  <Button className="w-full h-11 bg-[#060853]! text-white! font-bold border-none">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default NaveBar;