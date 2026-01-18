import { FlipCard } from './FlipCard';
import { questions } from '../data/questions';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  // Get 3 sample questions (using a deterministic approach to avoid impure function during render)
  const sampleQuestions = [
    questions[0],
    questions[Math.floor(questions.length / 2)],
    questions[questions.length - 1]
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 relative overflow-auto">
      {/* Ambient edge glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#00E8FF]"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#FF3AC8]"></div>
      </div>

      <div className="text-center max-w-6xl w-full relative z-10 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-2" style={{
            background: 'linear-gradient(135deg, #00E8FF 0%, #7FEFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 20px rgba(0, 232, 255, 0.3)'
          }}>
            SOC OPS
          </h1>
          <p className="text-xl text-[#94A3B8] tracking-wide uppercase text-sm mb-4">Social Bingo</p>
          <p className="text-[#E2E8F0] text-lg max-w-2xl mx-auto">
            Break the ice with playful discovery. Click cards to explore the game!
          </p>
        </div>

        {/* Three Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {/* Card 1: The Game */}
          <FlipCard
            accentColor="accent"
            ariaLabel="The Game - Click to see gameplay details"
            frontContent={
              <div className="text-center">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-[#E2E8F0]">The Game</h3>
              </div>
            }
            backContent={
              <div>
                <h3 className="text-xl font-bold text-[#E2E8F0] mb-4">How to Play</h3>
                <ul className="text-left text-[#94A3B8] text-sm space-y-2.5">
                  <li className="flex items-start">
                    <span className="text-accent mr-2 flex-shrink-0">▹</span>
                    <span>Find people who match the questions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 flex-shrink-0">▹</span>
                    <span>Tap a square when you find a match</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-2 flex-shrink-0">▹</span>
                    <span>Get 5 in a row to win!</span>
                  </li>
                </ul>
              </div>
            }
          />

          {/* Card 2: Why You'll Love It */}
          <FlipCard
            accentColor="marked"
            ariaLabel="Why You'll Love It - Click to see benefits"
            frontContent={
              <div className="text-center">
                <div className="text-6xl mb-4">💝</div>
                <h3 className="text-2xl font-bold text-[#E2E8F0]">Why You'll Love It</h3>
              </div>
            }
            backContent={
              <div>
                <h3 className="text-xl font-bold text-[#E2E8F0] mb-4">Benefits</h3>
                <ul className="text-left text-[#94A3B8] text-sm space-y-2.5">
                  <li className="flex items-start">
                    <span className="text-marked mr-2 flex-shrink-0">♥</span>
                    <span>Make meaningful connections effortlessly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-marked mr-2 flex-shrink-0">♥</span>
                    <span>Turn awkward small talk into fun discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-marked mr-2 flex-shrink-0">♥</span>
                    <span>Remember faces and stories that matter</span>
                  </li>
                </ul>
              </div>
            }
          />

          {/* Card 3: Sample Questions */}
          <FlipCard
            accentColor="bingo"
            ariaLabel="Sample Questions - Click to see examples"
            frontContent={
              <div className="text-center">
                <div className="text-6xl mb-4">❓</div>
                <h3 className="text-2xl font-bold text-[#E2E8F0]">Sample Questions</h3>
              </div>
            }
            backContent={
              <div>
                <h3 className="text-xl font-bold text-[#E2E8F0] mb-4">Example Prompts</h3>
                <ul className="text-left text-[#94A3B8] text-sm space-y-2.5">
                  {sampleQuestions.map((question, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-bingo mr-2 flex-shrink-0">•</span>
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
        </div>

        {/* CTA Button */}
        <div className="max-w-md mx-auto">
          <button
            onClick={onStart}
            className="w-full bg-accent text-[#0A0F14] font-bold py-4 px-8 rounded-[var(--radius-md)] text-lg transition-all glow-accent hover:glow-accent-strong active:scale-[0.98]"
            style={{
              transitionDuration: 'var(--dur-mid)',
              transitionTimingFunction: 'var(--ease-spring)'
            }}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
