import FadeIn from './components/providers/fade-in-provider';
import Image from "next/image";
import Link from "next/link";
import martijnImage from "../../public/images/about/martijn.jpg";
import { HandMetal, Minus } from "lucide-react";
import ReactSvg from "./components/svg/react-icon";

export default function Page() {
    return (
        <main>
            <div className="container mx-auto px-6">
                <div className="lg:max-w-3xl">
                    <FadeIn delay="delay-100">
                        <h1 className="font-bold mb-6 text-3xl md:text-5xl">
                            Hi and welcome. Let's build something amazing together!
                        </h1>
                    </FadeIn>
                </div>
                <div className="flex flex-col md:flex-row mt-6">
                    <div className="md:basis-64 mx-6">
                        <FadeIn delay="delay-300">
                            <Image
                                src={martijnImage}
                                alt="Picture of Martijn"
                                className="rounded-full border-10 border-primary" />
                        </FadeIn>
                    </div>
                    <div className="md:basis-128 mt-6">
                        <FadeIn delay="delay-500">
                            <div className="flex">
                                <span className="font-mono">
                                    Hi there
                                </span>
                                <span className="ml-2 text-primary">
                                    <HandMetal />
                                </span>
                            </div>
                            <h2 className="font-bold text-primary mb-6 text-2xl md:text-4xl">
                                Who am I?
                            </h2>
                            <p className="text-xl">
                                I'm Martijn, a software architect with a passion for building scalable and efficient systems.
                                I have experience in various programming languages and frameworks, and I enjoy exploring new technologies.
                                Feel free to check out my <Link href="/blog"><b>blog</b></Link> for insights on software development, architecture, and more!
                            </p>
                        </FadeIn>
                    </div>
                </div>
                <div className="min-h-160 mt-6">
                    <FadeIn delay="delay-700">
                        <div className="flex">
                            <div className="text-primary h-min my-auto">
                                <Minus />
                            </div>
                            <div>
                                <h2 className="font-bold mb-6 text-2xl md:text-4xl">
                                    <span className="text-primary">L</span>atest posts
                                </h2>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="basis-1/3 min-h-80 rounded-xl border-4 border-dashed border-primary mb-6 md:mb-0 md:mr-6">
                            </div>
                            <div className="basis-1/3 min-h-80 rounded-xl border-4 border-dashed border-secondary mb-6 md:mb-0">
                            </div>
                            <div className="basis-1/3 min-h-80 rounded-xl border-4 border-dashed border-primary md:mb-0 md:ml-6">
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay="delay-700">
                        <div className="flex mt-6">
                            <div className="text-primary h-min my-auto">
                                <Minus />
                            </div>
                            <div>
                                <h2 className="font-bold mb-6 text-2xl md:text-4xl">
                                    <span className="text-primary">S</span>kills
                                </h2>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </main >
    );
};

{/* https://tamalsen.dev/ */ }