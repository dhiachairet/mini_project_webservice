import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Zone } from './zone.entity';

@ObjectType()
@Entity()
export class TrafficData {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('int')
  vehicleCount: number;

  @Field()
  @Column()
  densityLevel: string;

  @Field()
  @CreateDateColumn()
  measuredAt: Date;

  @ManyToOne(() => Zone, (zone) => zone.history)
  zone: Zone;
}