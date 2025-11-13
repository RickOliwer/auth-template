import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "@/lib/actions/auth";

const componentsLoggedOut: { title: string; href: string }[] = [
  {
    title: "Login",
    href: "/",
  },
  {
    title: "Register",
    href: "/signup",
  },
];

const componentsLoggedIn: { title: string; href: string }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default async function Nav() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <nav className="flex items-center justify-between w-full">
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
            {componentsLoggedOut.map((component) => (
              <NavigationMenuItem key={component.title}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={component.href}>{component.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    );
  }
  return (
    <nav className="flex items-center justify-between w-full">
      <NavigationMenu>
        <NavigationMenuList className="flex-wrap">
          {componentsLoggedIn.map((component) => (
            <NavigationMenuItem key={component.title}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={component.href}>{component.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <form action={signOut}>
        <Button type="submit" variant="outline">
          {session.user?.name}
          <LogOutIcon className="w-4 h-4" />
        </Button>
      </form>
    </nav>
  );
}
