// forumController.test.js
const { createPost, getPosts } = require('../controllers/ForumController');
const User = require('../models/UserModel');
const Post = require('../models/ForumModel');

jest.mock('../models/UserModel');
jest.mock('../models/ForumModel');

describe('Forum Controller Tests', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
        mockRequest = {
            user: { _id: 'user123' },
            body: {}
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        nextFunction = jest.fn();
    });

    describe('createPost', () => {
        it('should create a new post and return success message', async () => {
            mockRequest.body = {
                title: 'Test Title',
                content: 'Test content',
            };
            User.findById.mockResolvedValue({
                _id: 'user123',
                username: 'testUser',
            });
            Post.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue({
                    author: 'user123',
                    title: 'Test Title',
                    content: 'Test content',
                })
            }));

            await createPost(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Post created successfully",
                post: expect.any(Object)
            });
        });

        it('should return a 400 status if title or content is missing', async () => {
            await createPost(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Title and content are required.'
            });
        });
    });

    describe('getPosts', () => {
        it('should fetch all posts and return them', async () => {
            Post.find.mockImplementation(() => ({
                lean: jest.fn().mockResolvedValue([{ title: 'Test Post', content: 'Test content' }])
            }));

            await getPosts(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
        });
    });
});
