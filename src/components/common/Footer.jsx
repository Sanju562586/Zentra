import { motion } from "framer-motion";
import Magnetic from "../animations/Magnetic";
import { Button } from "../ui/button";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-background text-muted-foreground py-20 border-t border-border overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className="container relative z-10 px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/zentra-logo.png"
                                alt="Zentra"
                                className="h-12 w-auto mix-blend-multiply dark:invert dark:mix-blend-screen"
                            />
                        </div>
                        <p className="max-w-md text-lg leading-relaxed">
                            The next generation distributed e-commerce system.
                            Built for scale, resilience, and observability.
                        </p>
                        <div className="flex gap-4">
                            <Magnetic>
                                <Button variant="outline" className="rounded-full border-white/20 hover:bg-white hover:text-black transition-colors">
                                    Get Started
                                </Button>
                            </Magnetic>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div className="space-y-4">
                        <h3 className="text-foreground font-semibold">Platform</h3>
                        <ul className="space-y-3">
                            {['Storefront', 'Admin Dashboard', 'Analytics', 'Tracing'].map((item) => (
                                <li key={item}>
                                    <Magnetic>
                                        <a href="#" className="block hover:text-white transition-colors w-fit">
                                            {item}
                                        </a>
                                    </Magnetic>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-4">
                        <h3 className="text-foreground font-semibold">Community</h3>
                        <ul className="space-y-3">
                            {['GitHub', 'Discord', 'Documentation', 'Status'].map((item) => (
                                <li key={item}>
                                    <Magnetic>
                                        <a href="#" className="block hover:text-foreground transition-colors w-fit">
                                            {item}
                                        </a>
                                    </Magnetic>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>© {currentYear} Zentra System. All rights reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Big Text Background - parallax effect could go here, but simple big text is nice */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
                <h1 className="text-[12rem] font-bold leading-none text-center whitespace-nowrap">
                    ZENTRA
                </h1>
            </div>
        </footer>
    );
}
