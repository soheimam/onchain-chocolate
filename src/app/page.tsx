// import SnowCanvas from '@/components/SnowCanvas';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* <SnowCanvas /> */}



      <main className="flex flex-col  items-center  px-8 sm:px-20 min-h-screen w-full  relative  bg-[#D3E5F4]">
        <section className="max-w-md">
          <article className="grid grid-cols-2 md:grid-cols-4 rounded-lg my-12">
            <div className="col-span-2 overflow-hidden rounded-tl-lg rounded-bl-lg">
              <Image src="/reindeer_hotchocolate.png" alt="Hot Chocolate" width={500} height={500} className="object-cover w-full h-full" />
            </div>
            <div className=" col-span-2 bg-[#145C92]  p-4 rounded-tr-lg rounded-br-lg flex flex-col  justify-between">
              <div className="flex items-center justify-end py-2">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-4xl  font-semibold mb-4 text-white font-libreBaskerville">Claim Hot chocolate</h2>
                <Button className="text-bold text-white ">

                  <SignedOut>
                    <SignInButton mode='modal' />
                  </SignedOut>

                </Button>
              </div>
              <div className="flex items-center justify-end ">
                <p className="text-[#97C8F0] text-sm mr-2"> Powered by </p>
                <Image src="/base.svg" alt="Base" width={80} height={20} className="object-fit h-32" />
              </div>
            </div>
          </article>
          <article className="grid grid-cols-2 md:grid-cols-4 my-12 rounded-lg">
            <div className="col-span-2 md:col-span-4 overflow-hidden rounded-lg">
              <Image src="/gift.png" alt="Gift" width={500} height={500} className="object-cover w-full h-full" />
            </div>
          </article>

        </section>
      </main>
      <footer className="row-start-3 w-screen bg-white h-full relative z-20">
        {/* Snow ground */}
      </footer>

    </>
  );
}
