import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsInt } from 'class-validator';
import { IncidentStatus } from '../entities/incident.entity';

@InputType()
export class UpdateIncidentStatusInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field(() => IncidentStatus)
  @IsEnum(IncidentStatus)
  status: IncidentStatus;
}
