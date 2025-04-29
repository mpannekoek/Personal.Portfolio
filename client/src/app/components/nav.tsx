'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '../../theme/theme-toggle';
import { House, Menu } from 'lucide-react';


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
                    <div className="flex px-6 gap-2 mx-auto rounded-3xl bg-stone-100/90 ring-1 ring-stone-200 shadow-xl shadow-stone-300/50">
                        <Link href="/" className="hover:bg-gray-500/20 rounded-3xl p-1">
                            <House size='22' />
                        </Link>
                        <span className="my-auto">|</span>
                        <button
                            type="button"
                            className="cursor-pointer hover:bg-gray-500/20 rounded-3xl p-1">
                            <Menu size='22' />
                        </button>
                        <span className="my-auto">|</span>
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