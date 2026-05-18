import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

@InputType()
export class CreateNotificationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  relatedIncidentId?: string;

  @Field()
  @IsNotEmpty()
  @IsIn(['ADMIN', 'OPERATOR'])
  recipientRole: string;
}
