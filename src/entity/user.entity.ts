import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm';
import bcrypt from 'bcrypt';
import config from '../config/defaults';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;


  @Column({ type: 'boolean', default: false })
  isSessionRevoked: boolean;
  
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password).catch(() => false);
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(config.saltWorkFactor);
    this.password = await bcrypt.hash(this.password, salt);
  }
}

export interface UserInput {
  fullName: string;
  email: string;
  password: string;
}
