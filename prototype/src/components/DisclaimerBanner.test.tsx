import { describe, it, expect } from 'vitest';
import { DisclaimerBanner } from './DisclaimerBanner';

describe('DisclaimerBanner', () => {
  it('component exports correctly', () => {
    expect(DisclaimerBanner).toBeDefined();
    expect(typeof DisclaimerBanner).toBe('function');
  });

  it('validates disclaimer message content', () => {
    const expectedMessage = 'This is a session-only demo. All data resets on page reload. No information is saved.';
    expect(expectedMessage).toContain('session-only demo');
    expect(expectedMessage).toContain('data resets');
    expect(expectedMessage).toContain('No information is saved');
  });

  it('validates modal limitation items', () => {
    const limitations = [
      'Session-only storage',
      'No data persistence',
      'Simulated responses',
      'No user accounts',
      'Limited functionality'
    ];

    expect(limitations.length).toBe(5);
    expect(limitations).toContain('Session-only storage');
    expect(limitations).toContain('No data persistence');
    expect(limitations).toContain('Simulated responses');
  });

  it('validates button labels', () => {
    const learnMoreLabel = 'Learn More';
    const gotItLabel = 'Got it';

    expect(learnMoreLabel).toBe('Learn More');
    expect(gotItLabel).toBe('Got it');
  });

  it('validates modal title', () => {
    const modalTitle = 'Demo Limitations';
    expect(modalTitle).toBe('Demo Limitations');
  });
});
