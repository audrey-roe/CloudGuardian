
import { AppDataSource } from "../data-source";
import { User, UserInput } from "../entity/user.entity";

export class UserService {
    public userRepository = AppDataSource.getRepository(User);

    async createUser(userInput: UserInput) {

        const existingUser = await this.userRepository.findOne({ where: { email: userInput.email } });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const newUser = this.userRepository.create({
            fullName: userInput.fullName,
            email: userInput.email,
            password: userInput.password,
        });

        try {
            const savedUser = await this.userRepository.save(newUser);
            const { password, ...userWithoutPassword } = savedUser;
            return userWithoutPassword;
        } catch (error) {
            throw new Error("Failed to create user");
        }
    }
    async login(email: string, password: string): Promise<string | null> {
        const user: User | undefined = await this.userRepository.findOne({ where: { email } });
    
        if (!user) {
          return "Invalid email or password";
        }
    
        const isPasswordValid: boolean = await user.comparePassword(password);
    
        if (!isPasswordValid) {
          return "Invalid email or password";
        }
    
        return null;
    }
}