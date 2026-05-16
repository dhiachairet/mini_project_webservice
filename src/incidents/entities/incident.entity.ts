import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum IncidentType {
  ACCIDENT = 'ACCIDENT',
  TRAVAUX = 'TRAVAUX',
  ROUTE_FERMEE = 'ROUTE_FERMEE',
  EMBOUTEILLAGE = 'EMBOUTEILLAGE',
}

export enum IncidentStatus {
  SIGNALE = 'SIGNALE',
  EN_COURS = 'EN_COURS',
  RESOLU = 'RESOLU',
}

registerEnumType(IncidentType, { name: 'IncidentType' });
registerEnumType(IncidentStatus, { name: 'IncidentStatus' });

@ObjectType()
@Entity()
export class Incident {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => IncidentType)
  @Column({ type: 'enum', enum: IncidentType })
  type: IncidentType;

  @Field(() => IncidentStatus)
  @Column({ type: 'enum', enum: IncidentStatus, default: IncidentStatus.SIGNALE })
  status: IncidentStatus;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @CreateDateColumn()
  reportedAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
