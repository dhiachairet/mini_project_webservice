import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficService } from './traffic.service';
import { TrafficResolver } from './traffic.resolver';
import { Zone } from './entities/zone.entity';
import { TrafficData } from './entities/traffic-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zone, TrafficData])],
  providers: [TrafficService, TrafficResolver],
})
export class TrafficModule {}