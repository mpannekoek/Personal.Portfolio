"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "../../theme/theme-toggle";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// const navItems = {
//     '/': { name: 'About' },
//     '/blog': { name: 'Blog' },
//     '/contact': { name: 'Contact' },
//   };

export default function NavBar() {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.pageYOffset > 50) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    return (
        <div>
            <div className="h-6 bg-black dark:bg-secondary" />
            <nav className={(isSticky ? "fixed top-0 left-0 right-0 bg-primary/80" : "")}>
                <div className="mx-auto">
                    <div className="flex justify-between mx-4 py-2">
                        <div className="flex gap-1 text-lg font-bold">
                            <Link href="/">
                                <span className="font-mono">&lt;MP /&gt;</span>
                            </Link>
                        </div>
                        <div className="flex gap-1">
                            <ThemeToggle />
                            <button
                                type="button"
                                className="cursor-pointer hover:bg-primary/85 rounded-3xl p-1"
                                onClick={() => {
                                    const mobileMenu = document.getElementById("mobile-menu");
                                    if (mobileMenu) {
                                        mobileMenu.classList.toggle("hidden");
                                        mobileMenu.classList.toggle("block");
                                    }
                                }}>
                                <Menu size="22" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div id="mobile-menu" className="w-2/3 hidden bg-white dark:bg-black fixed top-0 right-0 bottom-0">
                <div className={(isSticky ? "hidden" : "h-6 bg-black dark:bg-white")} />
                <div className="px-4 py-2">
                    <div className="w-min ml-auto">
                        <button
                            type="button"
                            className="cursor-pointer hover:bg-primary/85 rounded-3xl p-1"
                            onClick={() => {
                                const mobileMenu = document.getElementById("mobile-menu");
                                if (mobileMenu) {
                                    mobileMenu.classList.toggle("hidden");
                                    mobileMenu.classList.toggle("block");
                                }
                            }}>
                            <X />
                        </button>
                    </div>
                    <div>
                        About
                    </div>
                </div>
            </div>
        </div>
    );
};