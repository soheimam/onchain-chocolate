'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Page() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(prev => Math.min(3, prev + 1));
    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="snow-box md:col-span-2 bg-white/10 backdrop-blur-md border-white/20 p-8 border shadow-xl hover:bg-white/20 transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Hot Chocolate</h2>
                    <div className="flex items-center gap-4">
                        {/* Incrementer */}
                        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={decrement}
                                disabled={quantity <= 1}
                                className="h-12 w-12 rounded-l-full hover:bg-white/20 text-white disabled:opacity-50"
                            >
                                <Minus className="h-6 w-6" />
                            </Button>
                            <div className="w-12 flex items-center justify-center">
                                <span className="text-xl font-bold text-white">{quantity}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={increment}
                                disabled={quantity >= 3}
                                className="h-12 w-12 rounded-r-full hover:bg-white/20 text-white disabled:opacity-50"
                            >
                                <Plus className="h-6 w-6" />
                            </Button>
                        </div>


                        <div className="flex flex-col gap-2">

                            {/* <Button
                                        className="relative px-8 py-4 text-white text-2xl md:text-3xl font-bold rounded-full 
                                                 bg-gradient-to-r from-red-500 via-red-400 to-red-500 
                                                 shadow-lg shadow-red-500/30
                                                 border border-white/20 backdrop-blur-sm
                                                 transform transition-all duration-300 ease-in-out 
                                                 hover:scale-105 hover:shadow-xl hover:shadow-red-500/40
                                                 hover:border-white/30
                                                 after:absolute after:inset-0 
                                                 after:bg-gradient-to-r after:from-white/0 after:via-white/20 after:to-white/0 
                                                 after:rounded-full after:opacity-0 
                                                 hover:after:opacity-100 after:transition-opacity"
                                    >
                                        Buy Hot Chocolate
                                    </Button> */}

                        </div>
                    </div>
                </Card>

                {/* First Side Card */}
                <Card className="md:col-span-2 bg-white/10 backdrop-blur-md border-white/20 p-8 border shadow-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-white">Side Content 1</h3>
                    <p className="text-white/80">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </Card>

                {/* Second Side Card */}
                <Card className="md:col-span-2 bg-white/10 backdrop-blur-md border-white/20 p-8 border shadow-xl hover:bg-white/20 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-3 text-white">Side Content 2</h3>
                    <p className="text-white/80">
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Card>
            </div>
        </div>
    );
}