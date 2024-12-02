import SnowCanvas from './components/SnowCanvas';

export default function Home() {
  return (
    <>
      <SnowCanvas />
      <div className="grid grid-rows-[20px_1fr_60px] items-center h-screen w-screen">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-8 sm:px-20">
          <h1 className="text-4xl font-heading">Hello Hot chocolate</h1>
          <p className="font-poppins">Welcome to our winter wonderland!</p>
        </main>
        <footer className="row-start-3 w-screen bg-white h-full relative z-20">
          {/* Snow ground */}
        </footer>
      </div>
    </>
  );
}
