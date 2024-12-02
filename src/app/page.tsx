import SnowCanvas from './components/SnowCanvas';

export default function Home() {
  return (
    <>
      <SnowCanvas />
      <div className="grid grid-rows-[20px_1fr_60px] items-center h-screen w-screen">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-8 sm:px-20">
          <h1>Hello Hot chocolate</h1>
        </main>
        <footer className="row-start-3 w-screen bg-white h-full">
          {/* Snow ground */}
        </footer>
      </div>
    </>
  );
}
