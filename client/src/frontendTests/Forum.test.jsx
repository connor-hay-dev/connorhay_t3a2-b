// ForumPage.test.jsx
import React from 'react';
import axios from 'axios';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForumPage from '../pages/Forum'; // Adjust the import path to match your file structure
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

// Mock external modules
// jest.mock('axios');
// jest.mock('react-cookie', () => ({
//   useCookies: jest.fn().mockReturnValue([{ token: 'dummyToken' }, null]),
// }));
// jest.mock('react-router-dom', () => ({
//   useNavigate: jest.fn(),
// }));

describe('ForumPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    axios.get.mockClear();
    axios.post.mockClear();
  });

  test('renders and fetches posts successfully', async () => {
    // Mock successful response for fetching posts
    const posts = [
      { _id: '1', title: 'Test Post 1', content: 'Content of test post 1', author: 'Author 1' },
      { _id: '2', title: 'Test Post 2', content: 'Content of test post 2', author: 'Author 2' },
    ];
    axios.get.mockResolvedValue({ data: posts });

    render(<ForumPage />);

    // Assert that posts are fetched and rendered
    await waitFor(() => {
      posts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
        expect(screen.getByText(post.content)).toBeInTheDocument();
        expect(screen.getByText(`By: ${post.author}`)).toBeInTheDocument();
      });
    });
  });

  test('submits a new post', async () => {
    // Mock successful post submission
    axios.post.mockResolvedValue({});

    // Render the component
    render(<ForumPage />);

    // Fill in the new post form
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Test Post' } });
    fireEvent.change(screen.getByPlaceholderText('Content'), { target: { value: 'Content of the new test post.' } });

    // Simulate form submission
    fireEvent.click(screen.getByText('Submit Post'));

    // Expect axios.post to have been called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        title: 'New Test Post',
        content: 'Content of the new test post.',
      }, expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer dummyToken`,
        }),
      }));
    });
  });

});
