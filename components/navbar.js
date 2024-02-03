import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";

export default function Intro(loginStatus) {
  return (
    <Navbar className="p-6">
      <NavbarBrand>
        <Link className="font-bold text-inherit text-[1.5rem] hover:text-[1.6rem]" href="/">The Seekers Feed</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {loginStatus.status === 'authenticated' ?
            (<Button onClick={() => signOut()} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg">Sign Out</Button>) :
            (<Button onClick={() => signIn()} className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg">Sign In</Button>)
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}