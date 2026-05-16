import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { IncidentType } from '../entities/incident.entity';

@InputType()
export class DeclareIncidentInput {
  @Field(() => IncidentType)
  @IsEnum(IncidentType)
  type: IncidentType;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  location: string;
}
