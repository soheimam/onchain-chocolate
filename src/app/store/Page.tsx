'use client';

import SecurityNoticeSlider from '@/components/SecurityNoticeSlider';
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Image from 'next/image';
import { useState } from "react";
export default function Page() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(prev => Math.min(3, prev + 1));
    const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

    return (

        <main className="flex flex-col  items-center  px-8 sm:px-20 min-h-screen   relative  bg-[#D3E5F4] ">
            <section className="max-w-lg">
                <article className="grid grid-cols-2 md:grid-cols-4 rounded-lg my-12">
                    <div className="col-span-2 overflow-hidden rounded-tl-lg rounded-bl-lg">
                        <Image src="/reindeer_hotchocolate.png" alt="Hot Chocolate" width={500} height={500} className="object-cover w-full h-full" />
                    </div>
                    <div className=" col-span-2 bg-[#145C92]  p-4 rounded-tr-lg rounded-br-lg flex flex-col  justify-between">

                        <div className="flex flex-col items-start">
                            <h2 className="text-4xl font-semibold mb-4 text-white font-libreBaskerville">Claim Hot chocolate</h2>
                            <Button className="text-bold text-white ">

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
                            </Button>
                        </div>
                        <div className="flex items-center justify-end ">
                            <p className="text-[#97C8F0] text-sm mr-2"> Powered by </p>
                            <Image src="/base.svg" alt="Base" width={80} height={20} className="object-fit h-32" />
                        </div>
                    </div>
                </article>
                <article className="grid grid-cols-2 md:grid-cols-4 my-12 rounded-lg">
                    <div className="col-span-2 p-2 light-blue rounded-lg flex flex-col justify-center items-start ">
                        <h2 className="text-lg  mb-4 text-white font-libreBaskerville">Cozy Up with Base</h2>
                        <p className="text-blue-900 text-sm font-poppins">
                            Base is powering everything from shops to creators—the next billion users start here.
                        </p>
                        <Button variant="link" className="ml-0 pl-0">Learn more</Button>
                    </div>
                    <div className="col-span-2  light-blue rounded-lg">
                        <Image src="/snow_scene.png" alt="Snow Scene" width={500} height={500} className="object-cover w-full h-full overflow-hidden" />
                    </div>
                </article>
                <article className="grid grid-cols-2 md:grid-cols-4 my-12 rounded-lg">
                    <SecurityNoticeSlider />
                </article>
            </section>
        </main>


    );
}