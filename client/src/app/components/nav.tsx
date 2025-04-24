'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../theme/theme-toggle';

const navItems = {
    '/': { name: 'About' },
    '/blog': { name: 'Blog' },
    '/contact': { name: 'Contact' },
  };

export default function NavBar() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.pageYOffset > 50) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    return (
        <nav className={isSticky ? 'fixed top-0 left-0 right-0' : 'mt-6'}>
            <div className="container mx-auto px-6 py-6">
                <div className="flex justify-between">
                    <div className='hidden md:block'>
                        Martijn Pannekoek
                    </div>
                    <div className="flex p-2 gap-4 mx-auto border rounded-3xl">                   
                        {Object.entries(navItems).map(([path, { name }]) => (
                            <Link
                                key={path}
                                href={path}
                                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
                                >
                                {name}
                            </Link>
                        ))}
                        <ThemeToggle />
                    </div>
                    <div className='hidden md:block'>
                        Software Architect
                    </div>
                </div>
            </div>
        </nav>
    );
};