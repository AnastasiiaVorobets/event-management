import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column()
  description: string;
}
