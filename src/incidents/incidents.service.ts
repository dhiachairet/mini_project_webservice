import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from './entities/incident.entity';
import { DeclareIncidentInput } from './dto/declare-incident.input';
import { UpdateIncidentStatusInput } from './dto/update-incident-status.input';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private incidentRepo: Repository<Incident>,
  ) {}

  async declare(input: DeclareIncidentInput): Promise<Incident> {
    const incident = this.incidentRepo.create(input);
    return this.incidentRepo.save(incident);
  }

  async findAll(): Promise<Incident[]> {
    return this.incidentRepo.find({ order: { reportedAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Incident> {
    const incident = await this.incidentRepo.findOne({ where: { id } });
    if (!incident) throw new NotFoundException(`Incident ${id} not found`);
    return incident;
  }

  async updateStatus(input: UpdateIncidentStatusInput): Promise<Incident> {
    const incident = await this.findOne(input.id);
    incident.status = input.status;
    return this.incidentRepo.save(incident);
  }
}
