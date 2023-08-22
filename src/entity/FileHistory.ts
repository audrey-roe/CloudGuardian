import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { File } from './File';

@Entity()
export class FileHistory { // this stores all teh file versions as they get updated.
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => File, file => file.versions)
  file: File;

  @Column({ type: 'varchar', length: 255 })
  storagePath: string;

  @Column({ type: 'timestamp' })
  uploadDate: Date;
}
