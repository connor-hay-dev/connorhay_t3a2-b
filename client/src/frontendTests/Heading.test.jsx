import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '../components/heading'; // Adjust the import path to where your Heading component is located

describe('Heading', () => {
  it('renders the heading text passed to it', () => {
    const testText = 'Test Heading';
    render(<Heading text={testText} />);

    const headingElement = screen.getByRole('heading', { name: testText });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass('heading');
    expect(headingElement.tagName).toBe('H2');
  });
});
