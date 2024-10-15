import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import NavigationBarList from "./NavigationBarList.jsx";
import { useAuth } from "../auth/AuthProvider.jsx";
import ProfileDropdownMenu from "./ProfileDropdownMenu.jsx";

export function NavigationBar() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const { userRoles } = useAuth();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const isUser = userRoles.includes("ROLE_USER");

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as="div" className="mr-4 cursor-pointer py-1.5 font-medium">
          <Logo />
        </Typography>
        {isUser ? (
          <div className="flex items-center gap-x-1">
            <ProfileDropdownMenu />
          </div>
        ) : (
          <>
            <div className="hidden lg:block">
              <span></span>
              {/* <NavigationBarList /> */}
            </div>
            <div className="flex items-center gap-x-1">
              <Button
                onClick={() => navigate("/login")}
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Log In</span>
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Sign up</span>
              </Button>
            </div>
          </>
        )}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {isUser ? (
            <ProfileDropdownMenu />
          ) : (
            <>
              <NavigationBarList />
              <div className="flex items-center gap-x-1">
                <Button
                  onClick={() => navigate("/login")}
                  fullWidth
                  variant="text"
                  size="sm"
                >
                  <span>Log In</span>
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  fullWidth
                  variant="gradient"
                  size="sm"
                >
                  <span>Sign up</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}
