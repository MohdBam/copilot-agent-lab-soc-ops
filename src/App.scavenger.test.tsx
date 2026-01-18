import { describe, it, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { questions } from './data/questions';

describe('Scavenger Hunt mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('offers a mode selector with Scavenger Hunt alongside Bingo by default', () => {
    render(<App />);

    const bingoOption = screen.getByRole('radio', { name: /bingo/i });
    const scavengerOption = screen.getByRole('radio', { name: /scavenger hunt/i });

    expect(bingoOption).toBeInTheDocument();
    expect(bingoOption).toBeChecked();
    expect(scavengerOption).toBeInTheDocument();
    expect(scavengerOption).not.toBeChecked();
  });

  it('shows a checklist with progress when starting Scavenger Hunt', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('radio', { name: /scavenger hunt/i }));
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));

    const progress = await screen.findByRole('progressbar', { name: /progress/i });
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '24');
    expect(progress).toHaveAttribute('aria-valuenow', '0');

    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(24);

    fireEvent.click(checkboxes[0]);
    expect(progress).toHaveAttribute('aria-valuenow', '1');
  });

  it('lists every scavenger prompt from the questions dataset', async () => {
    render(<App />);

    fireEvent.click(screen.getByRole('radio', { name: /scavenger hunt/i }));
    fireEvent.click(screen.getByRole('button', { name: /start game/i }));

    for (const prompt of questions) {
      expect(await screen.findByText(new RegExp(prompt, 'i'))).toBeInTheDocument();
    }
  });
});
