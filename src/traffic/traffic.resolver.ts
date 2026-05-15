import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { Zone } from './entities/zone.entity';
import { CreateZoneInput } from './dto/create-zone.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver()
export class TrafficResolver {
  constructor(private trafficService: TrafficService) {}

  @Mutation(() => Zone)
  @UseGuards(JwtAuthGuard)
  createZone(@Args('input') input: CreateZoneInput) {
    return this.trafficService.create(input);
  }

  @Query(() => [Zone])
  @UseGuards(JwtAuthGuard)
  zones() {
    return this.trafficService.findAll();
  }

  @Query(() => Zone)
  @UseGuards(JwtAuthGuard)
  zone(@Args('id') id: number) {
    return this.trafficService.findOne(id);
  }

  @Mutation(() => Zone)
  @UseGuards(JwtAuthGuard)
  measureDensity(@Args('zoneId') zoneId: number) {
    return this.trafficService.measureDensity(zoneId);
  }

  @Query(() => [Zone])
  @UseGuards(JwtAuthGuard)
  congestedZones() {
    return this.trafficService.getCongested();
  }
}