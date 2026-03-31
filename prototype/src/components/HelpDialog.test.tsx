import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HelpDialog } from './HelpDialog';

describe('HelpDialog', () => {
  it('renders when open is true', () => {
    render(<HelpDialog open={true} onClose={vi.fn()} />);
    expect(screen.getByText('About NutriBot Demo')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<HelpDialog open={false} onClose={vi.fn()} />);
    expect(screen.queryByText('About NutriBot Demo')).not.toBeInTheDocument();
  });

  it('calls onClose when Got it button is clicked', () => {
    const onClose = vi.fn();
    render(<HelpDialog open={true} onClose={onClose} />);
    
    const gotItButton = screen.getByText('Got it');
    fireEvent.click(gotItButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onResetSession and onClose when Reset Session button is clicked', () => {
    const onClose = vi.fn();
    const onResetSession = vi.fn();
    render(<HelpDialog open={true} onClose={onClose} onResetSession={onResetSession} />);
    
    const resetButton = screen.getByText('Reset Session');
    fireEvent.click(resetButton);
    
    expect(onResetSession).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('displays seven-step pipeline information', () => {
    render(<HelpDialog open={true} onClose={vi.fn()} />);
    
    expect(screen.getByText('Seven-Step Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Context Collection')).toBeInTheDocument();
    expect(screen.getByText('TPB Inference')).toBeInTheDocument();
    expect(screen.getByText('TTM Stage Classification')).toBeInTheDocument();
  });

  it('displays TPB/TTM framework accordion', () => {
    render(<HelpDialog open={true} onClose={vi.fn()} />);
    
    expect(screen.getByText('TPB/TTM Framework')).toBeInTheDocument();
  });

  it('displays demo limitations accordion', () => {
    render(<HelpDialog open={true} onClose={vi.fn()} />);
    
    expect(screen.getByText('Demo Limitations')).toBeInTheDocument();
  });

  it('displays demo prototype disclaimer', () => {
    render(<HelpDialog open={true} onClose={vi.fn()} />);
    
    expect(screen.getByText('This is a demonstration prototype')).toBeInTheDocument();
  });

  it('handles missing onResetSession prop gracefully', () => {
    const onClose = vi.fn();
    render(<HelpDialog open={true} onClose={onClose} />);
    
    const resetButton = screen.getByText('Reset Session');
    fireEvent.click(resetButton);
    
    // Should not throw error and should still close
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
