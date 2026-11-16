import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe('Auto Delete Todo', () => {
  it('moves a clicked item and automatically returns it in five seconds', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Apple: move to Fruit' }));
    expect(screen.getByRole('button', { name: 'Apple: return to main list' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(4999));
    expect(screen.getByRole('button', { name: 'Apple: return to main list' })).toBeTruthy();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole('button', { name: 'Apple: move to Fruit' })).toBeTruthy();
  });
  it('returns immediately and cancels the old timer', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Broccoli: move to Vegetable' }));
    fireEvent.click(screen.getByRole('button', { name: 'Broccoli: return to main list' }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole('button', { name: 'Broccoli: move to Vegetable' })).toBeTruthy();
  });
  it('resets all timers and items', () => {
    vi.useFakeTimers();
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Banana: move to Fruit' }));
    fireEvent.click(screen.getByRole('button', { name: /Reset list/i }));
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole('button', { name: 'Banana: move to Fruit' })).toBeTruthy();
  });
});
