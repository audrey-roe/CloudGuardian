import { Repository } from "typeorm";
import { User, UserInput } from "../entity/user.entity";
import { UserService } from "../service/user.service";
import createServer from "../utils/server";
const app = createServer();

describe( "UserService", () =>{
    describe("get user route ", ()=>{
        // Passed Tests that the method creates a new user with valid input
        it('should create a new user with valid input', async () => {
            // Arrange
            
            const userInput: UserInput = {
            fullName: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            
            };
        
            const userRepositoryMock = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue(userInput),
            save: jest.fn().mockResolvedValue(userInput),
            };
            const userService = new UserService();
            userService['userRepository'] = userRepositoryMock as unknown as Repository<User>;
        
            // Act
            const result = await userService.createUser(userInput);
        
            // Assert
            expect(result).toEqual({
                fullName: "John Doe",
                email: "johndoe@example.com",
                
            });
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: "johndoe@example.com" } });
            expect(userRepositoryMock.create).toHaveBeenCalledWith(userInput);
            expect(userRepositoryMock.save).toHaveBeenCalledWith(userInput);
        });
        
        // Passed: Tests that the method throws an error if a user with the same email already exists
        it('should throw an error if a user with the same email already exists', async () => {
            // Arrange
            const userInput: UserInput = {
            fullName: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            };
            const existingUser = {
            fullName: "Existing User",
            email: "johndoe@example.com",
            password: "password123",
            };
            const userRepositoryMock = {
            findOne: jest.fn().mockResolvedValue(existingUser),
            };
            const userService = new UserService();
            userService['userRepository'] = userRepositoryMock as unknown as Repository<User>;
    
            // Act and Assert
            await expect(userService.createUser(userInput)).rejects.toThrow("User with this email already exists");
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: "johndoe@example.com" } });
        });
        // Passed Tests that the method throws an error if it fails to create the user
        it('should throw an error if it fails to create the user', async () => {
            // Arrange
            const userInput: UserInput = {
            fullName: "John Doe",
            email: "johndoe@example.com",
            password: "password123",
            };
            const userRepositoryMock = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue(userInput),
            save: jest.fn().mockRejectedValue(new Error("Failed to save user")),
            };
            const userService = new UserService();
            userService['userRepository'] = userRepositoryMock as unknown as Repository<User>;
        
            // Act and Assert
            await expect(userService.createUser(userInput)).rejects.toThrow("Failed to create user");
            expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: "johndoe@example.com" } });
            expect(userRepositoryMock.create).toHaveBeenCalledWith(userInput);
            expect(userRepositoryMock.save).toHaveBeenCalledWith(userInput);
        });
        // Passed Tests that the method returns null when provided with a valid email and password
        it('should return null when provided with a valid email and password', async () => {
            // Arrange
            const email = 'validemail@example.com';
            const password = 'validpassword';
            const userRepositoryMock = {
            findOne: jest.fn().mockResolvedValue({
                comparePassword: jest.fn().mockResolvedValue(true)
            })
            };
            const userService = new UserService();
            userService['userRepository'] = userRepositoryMock as unknown as Repository<User>;
    
            // Act
            const result = await userService.login(email, password);
    
            // Assert
            expect(result).toBeNull();
        });
    });
});