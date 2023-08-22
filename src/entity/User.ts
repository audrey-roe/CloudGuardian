import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import bcrypt from 'bcrypt';
import config from '../config/defaults';
import { File } from './File';
import { Folder } from './Folder';

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

  // Establishing relationships for files and folders, this will be for the file management. 
  @OneToMany(() => File, file => file.user)
  files: File[];

  @OneToMany(() => Folder, folder => folder.user)
  folders: Folder[];

  @Column({ type: 'boolean', default: false })
  isSessionRevoked: boolean;
  
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password).catch(() => false);
  }

  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(config.saltWorkFactor);
    this.password = await bcrypt.hash(this.password, salt);
  }
}

@Entity()
export class Admin extends User {

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @OneToMany(() => File, file => file.pendingReviewBy)
  filesPendingDeletion: File[];
}
