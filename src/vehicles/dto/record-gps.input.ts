import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, Min, Max } from 'class-validator';

@InputType()
export class RecordGpsInput {
  @Field()
  @IsNumber()
  vehicleId: number;

  @Field()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @Field()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}