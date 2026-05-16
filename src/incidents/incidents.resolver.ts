import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { Incident } from './entities/incident.entity';
import { DeclareIncidentInput } from './dto/declare-incident.input';
import { UpdateIncidentStatusInput } from './dto/update-incident-status.input';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Resolver()
export class IncidentsResolver {
  constructor(private incidentsService: IncidentsService) {}

  @Mutation(() => Incident)
  @UseGuards(JwtAuthGuard)
  declareIncident(@Args('input') input: DeclareIncidentInput) {
    return this.incidentsService.declare(input);
  }

  @Query(() => [Incident])
  @UseGuards(JwtAuthGuard)
  incidents() {
    return this.incidentsService.findAll();
  }

  @Query(() => Incident)
  @UseGuards(JwtAuthGuard)
  incident(@Args('id', { type: () => Int }) id: number) {
    return this.incidentsService.findOne(id);
  }

  @Mutation(() => Incident)
  @UseGuards(JwtAuthGuard)
  updateIncidentStatus(@Args('input') input: UpdateIncidentStatusInput) {
    return this.incidentsService.updateStatus(input);
  }
}
