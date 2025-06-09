import { data } from '../portfolioData'; // This path should still be correct
import TypingAnimation from '../components/TypingAnimation';
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-green-400 font-mono">
      <div className="w-full max-w-4xl">
        <header className="mb-8">
          {/* Accessing data.name directly as our transformedData provides it at the top level */}
          <h1 className="text-4xl md:text-5xl font-bold">
            {'>'} {data.name}
          </h1>
          {data.who_am_i && data.who_am_i.length > 0 && (
            <div className="text-xl md:text-2xl mt-2 text-cyan-400">
              {'> '} <TypingAnimation sequences={data.who_am_i} />
            </div>
          )}
        </header>

        <section id="about" className="mb-8">
          <h2 className="text-2xl mb-2 text-yellow-400">~/about-me:</h2>
          <p>{data.summary}</p>
        </section>

        {/* We will add more sections (experience, skills, contact) here */}
      </div>
    </main>
  );
}