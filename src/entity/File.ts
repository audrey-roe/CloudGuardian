import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User, Admin} from './User';
import { Folder } from './Folder'; 
import { FileHistory } from './FileHistory';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'bigint' }) 
  fileSize: number;

  @Column({ type: 'varchar', length: 255 })
  fileType: string; //fileType attribute represents the type of thw file (eg..., 'image/jpeg', 'video/mp4', etc.)

  @Column({ type: 'varchar', length: 255 })
  storagePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploadDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mediaURL: string;

  @Column({ type: 'int', nullable: true })
  duration: number; //duration will be stored in seconds

  @Column({ type: 'varchar', length: 255, nullable: true })
  mediaType: string; // eg.. 'video', 'audio', etc.


  @ManyToOne(() => User, user => user.files)
  user: User;

  @ManyToOne(() => Folder, folder => folder.files)
  folder: Folder;

  @OneToMany(() => FileHistory, version => version.file)
  versions: FileHistory[];

  @Column({ type: 'boolean', default: false })
  isPendingDeletion: boolean;

  @ManyToOne(() => Admin, admin => admin.filesPendingDeletion, { nullable: true })
  pendingReviewBy: Admin;
}
