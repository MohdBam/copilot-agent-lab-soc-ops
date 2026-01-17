import { questions, FREE_SPACE } from '../data/questions';

interface StartScreenProps {
  onStart: () => void;
}

interface FeatureCardProps {
  icon: string;
  headline: string;
  description: string;
  accentColor: 'cyan' | 'magenta' | 'amber';
  staggerClass?: string;
}

function FeatureCard({ icon, headline, description, accentColor, staggerClass = '' }: FeatureCardProps) {
  const borderColorMap = {
    cyan: 'border-accent',
    magenta: 'border-marked',
    amber: 'border-bingo'
  };
  
  const textColorMap = {
    cyan: 'text-accent',
    magenta: 'text-marked',
    amber: 'text-bingo'
  };

  return (
    <div className={`glass-surface scanlines rounded-[var(--radius-lg)] p-6 border ${borderColorMap[accentColor]} animate-fade-in-up ${staggerClass}`}>
      <div className={`text-4xl mb-3 ${textColorMap[accentColor]}`}>{icon}</div>
      <h3 className="font-semibold text-[#E2E8F0] mb-2 text-lg">{headline}</h3>
      <p className="text-[#94A3B8] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export function StartScreen({ onStart }: StartScreenProps) {
  // Generate a sample frozen board for preview
  const previewBoard = Array.from({ length: 25 }, (_, i) => {
    const isFreeSpace = i === 12;
    return {
      id: i,
      text: isFreeSpace ? FREE_SPACE : questions[i % questions.length],
      isMarked: false,
      isFreeSpace
    };
  });

  return (
    <div className="min-h-full overflow-y-auto relative">
      {/* Ambient edge glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#00E8FF]"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-[#FF3AC8]"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Section 1: Hero */}
        <section className="text-center space-y-4">
          <h1 
            className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up stagger-1" 
            style={{
              background: 'linear-gradient(135deg, #00E8FF 0%, #7FEFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            SOC OPS
          </h1>
          <p className="text-2xl text-[#E2E8F0] font-semibold animate-fade-in-up stagger-2">
            Break the ice, make connections
          </p>
          <p className="text-[#94A3B8] text-lg animate-fade-in-up stagger-3">
            The social bingo game that turns mixers into memorable moments
          </p>
        </section>

        {/* Section 2: How It Works */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#E2E8F0] animate-fade-in-up stagger-4">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              icon="🎯"
              headline="What is Bingo?"
              description="Get a 5×5 grid filled with fun conversation starters and icebreaker prompts."
              accentColor="cyan"
              staggerClass="stagger-5"
            />
            <FeatureCard
              icon="👥"
              headline="Find Your People"
              description="Mingle and discover who matches each prompt. Every conversation is a chance to connect."
              accentColor="magenta"
              staggerClass="stagger-6"
            />
            <FeatureCard
              icon="✨"
              headline="Easy Gameplay"
              description="Tap squares as you find matches. First to complete a line wins—but everyone leaves with new friends."
              accentColor="amber"
              staggerClass="stagger-7"
            />
          </div>
        </section>

        {/* Section 3: Why You'll Love It */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#E2E8F0] animate-fade-in-up stagger-8">
            Why You'll Love It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              icon="❄️"
              headline="Ice Breaker"
              description="No more awkward small talk. Every prompt gives you something interesting to discuss."
              accentColor="cyan"
              staggerClass="stagger-9"
            />
            <FeatureCard
              icon="💬"
              headline="Real Connections"
              description="Go beyond name tags. Discover shared experiences and unexpected commonalities."
              accentColor="magenta"
              staggerClass="stagger-9"
            />
            <FeatureCard
              icon="🎉"
              headline="Fun & Fast"
              description="Quick to learn, endlessly replayable. Perfect for events of any size."
              accentColor="amber"
              staggerClass="stagger-9"
            />
          </div>
        </section>

        {/* Section 4: Preview Board */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-[#E2E8F0] animate-fade-in-up stagger-8">
            Preview Your Board
          </h2>
          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto aspect-square p-1 animate-fade-in-up stagger-9">
            {previewBoard.map((square) => (
              <div
                key={square.id}
                className={`
                  relative flex items-center justify-center p-2 text-center border rounded-[var(--radius-sm)] 
                  min-h-[60px] text-xs leading-tight
                  ${square.isFreeSpace 
                    ? 'glass-surface scanlines border-accent text-accent font-bold text-sm glow-accent' 
                    : 'glass-surface border-accent/40 text-[#94A3B8]'
                  }
                `}
              >
                <span className="break-words hyphens-auto">{square.text}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[#64748B] text-sm animate-fade-in-up stagger-10">
            Tap squares during the game to mark your matches
          </p>
        </section>

        {/* Section 5: CTA */}
        <section className="text-center space-y-4 pb-8">
          <button
            onClick={onStart}
            className="w-full max-w-sm mx-auto block bg-accent text-[#0A0F14] font-bold py-4 px-8 rounded-[var(--radius-md)] text-lg transition-all glow-accent hover:glow-accent-strong active:scale-[0.98] animate-fade-in-up stagger-10"
            style={{
              transitionDuration: 'var(--dur-mid)',
              transitionTimingFunction: 'var(--ease-spring)'
            }}
          >
            START GAME
          </button>
          <p className="text-[#64748B] text-sm animate-fade-in-up stagger-10">
            Ready when you are. Let's make some connections! 🚀
          </p>
        </section>
      </div>
    </div>
  );
}
