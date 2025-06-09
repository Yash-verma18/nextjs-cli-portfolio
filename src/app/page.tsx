import Terminal from '@/components/Terminal'; // Assuming path alias is set up

export default function HomePage() {
  return (
    <main className="flex flex-col h-screen bg-black text-green-400 font-mono selection:bg-green-700 selection:text-black">
      {/* 
        The Terminal component will now essentially be the entire page content.
        We can add a static header/title bar above the terminal later if desired.
      */}
      <Terminal />
    </main>
  );
}