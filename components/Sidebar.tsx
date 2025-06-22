"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  // At the top of your component
  const isValidAvatar = avatar && avatar.startsWith("http");

  <Image
    src={isValidAvatar ? avatar : avatarPlaceholderUrl}
    alt="user-avatar"
    width={44}
    height={44}
    className="sidebar-user-avatar"
  />;

  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <Link href="/">
        <Image
          src="/full-brand-logo.png"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/Logo-brand.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => {
            const isActive = pathname === url;

            return (
              <Link key={name} href={url} className="lg:w-full">
                <li
                  className={cn("sidebar-nav-item", isActive && "shad-active")}
                >
                  <Image
                    src={icon}
                    alt={`${name}-icon`}
                    width={24}
                    height={24}
                    className={cn("nav-icon", isActive && "nav-icon-active")}
                  />
                  <p className="hidden lg:block">{name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>

      {/* Illustration */}
      <Image
        src="/illustration.webp"
        alt="illustration"
        width={600}
        height={600}
        className="w-full"
      />

      {/* User Info */}
      <div className="sidebar-user-info">
        <Image
          src={isValidAvatar ? avatar : avatarPlaceholderUrl}
          alt="user-avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
