import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { TrafficData } from './traffic-data.entity';

@ObjectType()
@Entity()
export class Zone {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('float')
  northEastLat: number;

  @Field()
  @Column('float')
  northEastLng: number;

  @Field()
  @Column('float')
  southWestLat: number;

  @Field()
  @Column('float')
  southWestLng: number;

  @Field()
  @Column({ default: 'FAIBLE' })
  currentDensity: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TrafficData, (data) => data.zone)
  history: TrafficData[];
}