'use client';

import { Card } from "@/components/ui/card";

export default function Page() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Main Article - spans 2 columns on desktop */}
                <Card className="md:col-span-2 p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Featured Article</h2>
                    <p className="text-white/80">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                </Card>

                {/* First Side Card */}
                <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-white">Side Content 1</h3>
                    <p className="text-white/80">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </Card>

                {/* Second Side Card */}
                <Card className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-white">Side Content 2</h3>
                    <p className="text-white/80">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Card>
            </div>
        </div>
    );
}