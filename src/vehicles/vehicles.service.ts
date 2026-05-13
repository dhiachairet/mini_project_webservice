import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { GpsPosition } from './entities/gps-position.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { RecordGpsInput } from './dto/record-gps.input';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
    @InjectRepository(GpsPosition)
    private gpsRepo: Repository<GpsPosition>,
  ) {}

  async create(input: CreateVehicleInput, userId: number) {
    const vehicle = this.vehicleRepo.create({
      ...input,
      userId,
    });
    return this.vehicleRepo.save(vehicle);
  }

  async findAll(role: string, userId: number) {
    if (role === 'ADMIN') {
      return this.vehicleRepo.find({ relations: ['positions'] });
    }
    // OPERATOR sees only their own vehicles
    return this.vehicleRepo.find({
      where: { userId },
      relations: ['positions'],
    });
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepo.findOne({
      where: { id },
      relations: ['positions'],
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async recordGps(input: RecordGpsInput) {
    const vehicle = await this.findOne(input.vehicleId);
    const position = this.gpsRepo.create({
      latitude: input.latitude,
      longitude: input.longitude,
      recordedAt: new Date(),
      vehicle,
    });
    return this.gpsRepo.save(position);
  }

  async getHistory(vehicleId: number) {
    const vehicle = await this.findOne(vehicleId);
    return vehicle.positions;
  }
}