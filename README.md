# 🎯 Soc Ops

### Break the ice, make connections, win at networking! 🎉

**Soc Ops** transforms awkward networking events into engaging social experiences. It's Social Bingo for in-person mixers — find people who match the prompts, mark your squares, and race to get five in a row!

---

## ✨ Why Soc Ops?

🤝 **Effortless Icebreaking** — No more awkward small talk. Every conversation has a purpose.  
📱 **Mobile-First Design** — Works beautifully on any device, right in the browser.  
🎨 **Modern & Polished** — Built with React 19, TypeScript, and Tailwind CSS v4.  
💾 **Progress Persistence** — Your board state saves automatically to localStorage.  
🚀 **Lightning Fast** — Powered by Vite for instant hot module replacement.

---

## 🎮 How It Works

1. **Start the Game** — Each player gets a unique 5×5 bingo board with 24 randomized prompts
2. **Mix & Mingle** — Find people who match each prompt (e.g., "has lived in another country", "speaks 3+ languages")
3. **Mark Your Board** — Tap squares as you meet qualifying people
4. **Win!** — First to complete a row, column, or diagonal wins

The center square is always a **FREE SPACE** to get you started! 🎁

---

## 🚀 Quick Start

### Prerequisites
- [Node.js 22](https://nodejs.org/) or higher

### Run Locally

```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Open your browser
# → http://localhost:5173
```

That's it! The game is now running locally. 🎊

---

## 🛠️ Development

```bash
# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
```

### Tech Stack

- ⚛️ **React 19** — Latest React with modern hooks
- 📘 **TypeScript** — Type-safe code throughout
- 🎨 **Tailwind CSS v4** — CSS-first configuration with `@theme`
- ⚡ **Vite** — Next-generation frontend tooling
- 🧪 **Vitest** — Blazing fast unit testing

---

## 🏗️ Architecture Highlights

**Clean Separation of Concerns:**
- 🎣 **Custom Hook** (`useBingoGame`) — All state management + localStorage persistence
- 🧮 **Pure Logic** (`bingoLogic.ts`) — Fisher-Yates shuffle, win detection (fully tested)
- 🎨 **Presentational Components** — Pure, reusable UI components
- 📦 **Immutable Updates** — Functional state transformations

**Game Logic:**
- 5×5 board with center FREE SPACE
- Win condition: 5 in a row (horizontal, vertical, or diagonal)
- Persistent state across page refreshes

---

## 🎨 Customization

Want to tailor the game to your event? 

**Customize Questions:** Edit [`src/data/questions.ts`](src/data/questions.ts) with prompts specific to your group or theme.

```typescript
// Example from questions.ts - customize these 25+ prompts!
export const questions: string[] = [
  "bikes to work",
  "has lived in another country",
  "has a pet",
  "speaks more than 2 languages",
  "has traveled to Asia",
  // ... 20+ more prompts
  // Add your own event-specific prompts!
];
```

**Theme & Colors:** Modify the Tailwind theme in [`src/index.css`](src/index.css):
```css
@theme {
  --color-accent: oklch(0.72 0.11 178);
  --color-marked: oklch(0.85 0.15 220);
  --color-bingo: oklch(0.75 0.18 142);
}
```

---

## 📦 Deployment

Deploys automatically to **GitHub Pages** on every push to `main`.

Manual deployment:
```bash
npm run build
# Upload the `dist/` directory to your hosting provider
```

---

## 🤝 Contributing

Contributions are welcome! Please check out:
- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Support](SUPPORT.md)

---

## 📄 License

MIT © [Harald Kirschner](https://github.com/MohdBam)

---

## 🌟 Show Your Support

If you find Soc Ops useful, give it a ⭐ on GitHub!

**Built with ❤️ for better networking experiences.**
