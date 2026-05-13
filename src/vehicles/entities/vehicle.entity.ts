import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GpsPosition } from './gps-position.entity';

@ObjectType()
@Entity()
export class Vehicle {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  licensePlate: string;

  @Field()
  @Column()
  brand: string;

  @Field()
  @Column()
  model: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  driver: string;

  // Store which user created this vehicle (optional, for role filtering)
  @Column({ nullable: true })
  userId: number;

  @Field(() => [GpsPosition])
  @OneToMany(() => GpsPosition, (pos) => pos.vehicle)
  positions: GpsPosition[];
}