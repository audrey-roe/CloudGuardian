import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express" //TODO remove unused next functions
import { User, UserInput } from "../entity/user.entity";
import { UserService } from "../service/user.service";

export class UserController {
    private userRepository = AppDataSource.getRepository(User)
    private userService = new UserService(); 

    async create(req: Request, res: Response, next: NextFunction) {
        const userInput: UserInput = req.body;

        try {
            const createdUser = await this.userService.createUser(userInput);
            return res.status(201).json(createdUser);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
    
        const loginResult = await this.userService.login(email, password);
        if (loginResult) {
          return res.status(401).send(loginResult);
        }
        return res.status(200).send("Login successful");
    }
}