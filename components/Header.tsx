'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Search from './Search';
import FileUploader from './FileUploader';
import { logout } from '@/app/actions/logout';


interface HeaderProps {
  userId: string;
  accountId: string;
}

const Header = ({ userId, accountId }: HeaderProps) => {
  return (
    <header className="header">
      <Search />

      <div className="header-wrapper gap-3">
        <FileUploader ownerId={userId} accountId={accountId} />

        <form action={logout}>
          <Button type="submit" className="sign-out-button">
            <Image
              src="/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
