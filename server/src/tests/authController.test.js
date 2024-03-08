// authController.test.js
const { Signup, Login, Logout } = require('../controllers/authController');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { createSecretToken } = require('../util/SecretToken');

jest.mock('../models/UserModel');
jest.mock('bcryptjs');
jest.mock('../util/SecretToken');

describe('Auth Controller Tests', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('Signup', () => {
    it('should create a new user and return a success message', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testUser',
        createdAt: new Date(),
      };
      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        _id: '1',
        ...mockRequest.body,
      });
      createSecretToken.mockReturnValue('secretToken');

      await Signup(mockRequest, mockResponse, nextFunction);

      expect(User.create).toHaveBeenCalledWith(mockRequest.body);
      expect(mockResponse.cookie).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User signed in successfully', success: true, user: expect.anything() });
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('Login', () => {
    it('should log in an existing user and return a success message', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123',
      };
      User.findOne.mockResolvedValue({
        _id: '1',
        password: 'password123',
      });
      bcrypt.compare.mockResolvedValue(true);
      createSecretToken.mockReturnValue('secretToken');

      await Login(mockRequest, mockResponse, nextFunction);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'password123');
      expect(mockResponse.cookie).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User logged in successfully', success: true });
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('Logout', () => {
    it('should clear the user token cookie and return a success message', async () => {
      await Logout(mockRequest, mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('token', {
        withCredentials: true,
        httpOnly: false,
      });
      expect(mockResponse.json).toHaveBeenCalledWith({ message: "User logged out successfully"});
    });
  });
});
