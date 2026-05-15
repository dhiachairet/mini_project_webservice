import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { TrafficData } from './entities/traffic-data.entity';
import { CreateZoneInput } from './dto/create-zone.input';

@Injectable()
export class TrafficService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,
    @InjectRepository(TrafficData)
    private trafficDataRepo: Repository<TrafficData>,
  ) {}

  async create(input: CreateZoneInput): Promise<Zone> {
    const zone = this.zoneRepo.create(input);
    return this.zoneRepo.save(zone);
  }

  async findAll(): Promise<Zone[]> {
    return this.zoneRepo.find();
  }

  async findOne(id: number): Promise<Zone> {
    const zone = await this.zoneRepo.findOne({ where: { id } });
    if (!zone) {
      throw new NotFoundException(`Zone ${id} not found`);
    }
    return zone;
  }

  async measureDensity(zoneId: number): Promise<Zone> {
    const zone = await this.findOne(zoneId);
    
    const vehicleCount = Math.floor(Math.random() * 100);
    let densityLevel = 'FAIBLE';
    if (vehicleCount > 30) densityLevel = 'MOYEN';
    if (vehicleCount > 60) densityLevel = 'ÉLEVÉ';

    const data = this.trafficDataRepo.create({
      vehicleCount,
      densityLevel,
      zone,
    });
    await this.trafficDataRepo.save(data);

    zone.currentDensity = densityLevel;
    return this.zoneRepo.save(zone);
  }

  async getCongested(): Promise<Zone[]> {
    return this.zoneRepo.find({ where: { currentDensity: 'ÉLEVÉ' } });
  }
}