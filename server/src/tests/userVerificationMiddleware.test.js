// authMiddleware.test.js
const { userVerification } = require('../middleware/authMiddleware');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

jest.mock('../models/UserModel');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Auth Middleware Tests', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {
      cookies: {}
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  it('should deny access if no token is provided', () => {
    userVerification(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Access denied. No token provided." });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should deny access if token is invalid', () => {
    mockRequest.cookies.token = 'invalidToken';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'), undefined);
    });

    userVerification(mockRequest, mockResponse, nextFunction);

    expect(jwt.verify).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Invalid token." });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should proceed to next middleware if token is valid', async () => {
    mockRequest.cookies.token = 'validToken';
    const decodedToken = { id: 'userId' };
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, decodedToken);
    });
    User.findById.mockResolvedValue({ id: 'userId', username: 'testUser' });

    await userVerification(mockRequest, mockResponse, nextFunction);

    expect(jwt.verify).toHaveBeenCalled();
    expect(User.findById).toHaveBeenCalledWith(decodedToken.id);
    expect(mockRequest.user).toBeDefined();
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return user not found if user does not exist', async () => {
    mockRequest.cookies.token = 'validToken';
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 'nonExistingUserId' });
    });
    User.findById.mockResolvedValue(null);

    await userVerification(mockRequest, mockResponse, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "User not found." });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
