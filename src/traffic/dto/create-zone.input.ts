import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNumber } from 'class-validator';

@InputType()
export class CreateZoneInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  northEastLat: number;

  @Field()
  @IsNumber()
  northEastLng: number;

  @Field()
  @IsNumber()
  southWestLat: number;

  @Field()
  @IsNumber()
  southWestLng: number;
}