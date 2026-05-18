import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Notification,
  NotificationStatus,
} from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async create(input: CreateNotificationInput): Promise<Notification> {
    const notification = this.notificationsRepository.create(input);
    return this.notificationsRepository.save(notification);
  }

  async findAllByRole(role: string): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { recipientRole: role },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }
    return notification;
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.status = NotificationStatus.READ;
    return this.notificationsRepository.save(notification);
  }

  async markAsUnread(id: string): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.status = NotificationStatus.UNREAD;
    return this.notificationsRepository.save(notification);
  }
}
