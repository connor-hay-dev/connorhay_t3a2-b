import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pomodoro from '../pages/PomodoroTimer';

describe('Pomodoro Timer', () => {
  test('renders Pomodoro component', () => {
    render(<Pomodoro />);
    expect(screen.getByRole('heading', { name: /pomodoro timer/i })).toBeInTheDocument();
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('starts and pauses timer', () => {
    jest.useFakeTimers();
    render(<Pomodoro />);

    fireEvent.click(screen.getByText('Start'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('24:59')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Pause'));
    expect(screen.getByText('Start')).toBeInTheDocument();

    jest.useRealTimers();
  });

  test('resets timer', () => {
    render(<Pomodoro />);
    
    fireEvent.click(screen.getByText('Start'));
    fireEvent.click(screen.getByText('Reset'));
    
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });
});
