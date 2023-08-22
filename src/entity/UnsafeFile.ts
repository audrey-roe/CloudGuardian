import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Admin } from './User'; 
import { File } from './File';

@Entity()
export class UnsafeFile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin)
  @JoinColumn()
  admin: Admin;

  @ManyToOne(() => File)
  @JoinColumn()
  file: File;
}
