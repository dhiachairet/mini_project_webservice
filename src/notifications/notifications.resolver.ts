import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Mutation(() => Notification)
  async createNotification(
    @Args('input') input: CreateNotificationInput,
  ): Promise<Notification> {
    return this.notificationsService.create(input);
  }

  @Query(() => [Notification])
  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Query(() => [Notification])
  async getMyNotifications(@Context() context): Promise<Notification[]> {
    // Temporarily return all notifications without role check
    return this.notificationsService.findAll();
  }

  @Query(() => Notification)
  async getNotification(@Args('id') id: string): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Args('id') id: string): Promise<Notification> {
    return this.notificationsService.markAsRead(id);
  }

  @Mutation(() => Notification)
  async markNotificationAsUnread(
    @Args('id') id: string,
  ): Promise<Notification> {
    return this.notificationsService.markAsUnread(id);
  }
}
