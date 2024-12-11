"use client"

import * as React from "react"
import Link from "next/link"
import { Link as LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "AWS EC2",
    href: "/instance/aws",
    description:
      "AWS Elastic Compute Cloud",
  },
  {
    title: "Azure VM",
    href: "/instance/azure",
    description:
      "Azure Virtual Machine",
  },
  {
    title: "GCP CE",
    href: "/instance/gcp",
    description:
      "Google Compute Engine",
  }
]

export function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
            <NavigationMenuTrigger>Cloud Providers</NavigationMenuTrigger>
            <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://github.com/eizyc/cloud-efficiency-toolkit-fe" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Github
              <LinkIcon size={16} className="ml-2"/>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
