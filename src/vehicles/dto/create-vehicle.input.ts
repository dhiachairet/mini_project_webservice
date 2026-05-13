import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsString()
  @MinLength(3)
  licensePlate: string;

  @Field()
  @IsString()
  brand: string;

  @Field()
  @IsString()
  model: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  driver?: string;
}