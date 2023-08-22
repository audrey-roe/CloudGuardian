import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User'; // Import the User entity if you've defined it
import { File } from './File'; // Import the File entity if you've defined it

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  folderName: string;

  @ManyToOne(() => User, user => user.folders)
  user: User;

  @OneToMany(() => File, file => file.folder)
  files: File[];
}
