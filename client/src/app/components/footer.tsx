import Link from 'next/link';
import Image from 'next/image';
import { Code } from 'lucide-react';
import facebookIcon from '../../../public/images/icons/facebook-icon.svg';
import githubIcon from '../../../public/images/icons/github-icon.svg';
import gmailIcon from '../../../public/images/icons/gmail-icon.svg';
import instagramIcon from '../../../public/images/icons/instagram-icon.svg';
import linkedinIcon from '../../../public/images/icons/linkedin-icon.svg';

export default function Footer() {
    let currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container mx-auto px-6">
                <div className="flex justify-between">
                    <div className="flex-col">
                        <Code className='font-bold mb-1' />
                        <div className="text-xl">Martijn Pannekoek</div>
                        <div>Software Architect</div>
                    </div>
                    <div className="flex-col">
                        <div className="font-bold mb-1">Pages</div>
                        <div><Link href="/about">About</Link></div>
                        <div><Link href="/blogs">Blogs</Link></div>
                        <div><Link href="/contact">Contact</Link></div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200" />
                <div className="flex gap-6 justify-center">
                    <Link href="https://github.com" target="_blank">
                        <Image priority src={githubIcon} alt='Check my code on GitHub' />
                    </Link>
                    <Link href="https://github.com" target="_blank">
                        <Image priority src={linkedinIcon} alt='Follow me on LinkedIn' />
                    </Link>
                    <Link href="https://instagram.com" target="_blank">
                        <Image priority src={instagramIcon} alt='Follow me on Instagram' />
                    </Link>
                    <Link href="https://facebook.com" target="_blank">
                        <Image priority src={facebookIcon} alt='Follow me on Facebook' />
                    </Link>
                    <Link href="mailto:martijnpannekoek.development@gmail.com" target="_blank">
                        <Image priority src={gmailIcon} alt='Mail me' />
                    </Link>
                </div>
                <div className="text-center my-6">
                    © {currentYear} <a href="/" className="hover:underline">Martijn Pannekoek</a>. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}