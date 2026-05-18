import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsIn } from 'class-validator';

@InputType()
export class UpdateNotificationInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['read', 'unread'])
  status?: string;
}
