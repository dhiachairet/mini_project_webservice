import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './entities/vehicle.entity';
import { GpsPosition } from './entities/gps-position.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { RecordGpsInput } from './dto/record-gps.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Mutation(() => Vehicle)
  @UseGuards(JwtAuthGuard)
  async addVehicle(
    @Args('input') input: CreateVehicleInput,
    @Context() context,
  ) {
    const { userId, role } = context.req.user;
    return this.vehiclesService.create(input, userId);
  }

  @Query(() => [Vehicle])
  @UseGuards(JwtAuthGuard)
  async vehicles(@Context() context) {
    const { userId, role } = context.req.user;
    return this.vehiclesService.findAll(role, userId);
  }

  @Query(() => Vehicle)
  @UseGuards(JwtAuthGuard)
  async vehicle(@Args('id') id: number) {
    return this.vehiclesService.findOne(id);
  }

  @Mutation(() => GpsPosition)
  @UseGuards(JwtAuthGuard)
  async recordGpsPosition(@Args('input') input: RecordGpsInput) {
    return this.vehiclesService.recordGps(input);
  }

  @Query(() => [GpsPosition])
  @UseGuards(JwtAuthGuard)
  async vehicleHistory(@Args('vehicleId') vehicleId: number) {
    return this.vehiclesService.getHistory(vehicleId);
  }
}