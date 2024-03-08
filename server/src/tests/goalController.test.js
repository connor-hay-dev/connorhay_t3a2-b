// goalController.test.js
const { createGoal, getGoals } = require('../controllers/GoalController');
const Goal = require('../models/GoalModel');
const User = require('../models/UserModel');

jest.mock('../models/GoalModel');
jest.mock('../models/UserModel');

describe('Goal Controller Tests', () => {
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

    describe('createGoal', () => {
        it('should create a new goal and return success message', async () => {
            mockRequest.body = {
                description: 'Test Description',
                endDate: new Date(),
            };
            User.findById.mockResolvedValue(true);
            Goal.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue({
                    author: mockRequest.user._id,
                    description: 'Test Description',
                    endDate: new Date(),
                })
            }));

            await createGoal(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "Goal created successfully",
                goal: expect.any(Object)
            });
        });

        it('should return a 400 status if description or endDate is missing', async () => {
            mockRequest.body = {};

            await createGoal(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Description and end date are required.'
            });
        });
    });

    describe('getGoals', () => {
        it('should fetch all goals and return them', async () => {
            Goal.find.mockImplementation(() => ({
                lean: jest.fn().mockReturnThis(),
                populate: jest.fn().mockResolvedValue([{ author: 'user123', description: 'Test Goal' }])
            }));

            await getGoals(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
        });
    });
});
