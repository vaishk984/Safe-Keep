'use client'

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { avatarPlaceholderUrl, navItems } from '@/constants';
import { usePathname } from 'next/navigation';
import path from 'path';
import { cn } from '@/lib/utils';

interface Props {
    fullName: string;
    avatar: string; 
    email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
    const pathname = usePathname();
  return (
    <aside className='sidebar'>
        <Link href='/'>
            <Image src="/full-brand-logo.png" 
            alt='logo' 
            width="160" 
            height="50"
            className='hidden h-auto lg:block'/>

            <Image src="/Logo-brand.png" 
            alt='logo' 
            width="52" 
            height="52" 
            className='lg:hidden'/>
        </Link>

        <nav className='sidebar-nav'>
            <ul className='flex flex-1 flex-col gap-6'>
                {navItems.map(({url, name, icon})=>{
                    const active = pathname === url;

                    return <Link key={name} href={url} className='lg:w-full'>

                        <li 
                        className={cn(
                        "sidebar-nav-item", 
                        (pathname===url) && "shad-active")}>
                            <Image 
                            src={icon} 
                            alt='icon' 
                            width={24} 
                            height={24}
                            className={
                            cn('nav-icon', pathname===url && 'nav-icon-active')
                            }
                            />

                            <p className='hidden lg:block'>{name}</p>
                        </li>
                    </Link>
                })}
            </ul>
        </nav>

        <Image src="/illustration.webp" alt="illustration" width={600} height={600}
        className='w-full'/>

        <div className='sidebar-user-info'>
            <Image src={avatarPlaceholderUrl} 
            alt='placeholder' 
            width={44} 
            height={44} 
            className='sidebar-user-avatar'/>

            <div className='hidden lg:block'>
                <p className='subtitle-2 capitalize'>
                     {fullName}
                </p>

                <p className='caption'>
                    {email}
                </p>

            </div>
        </div>
    </aside>
  )
}

export default Sidebar
