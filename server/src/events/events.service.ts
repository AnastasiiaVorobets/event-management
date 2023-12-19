import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  // Retrieve all events
  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  // Retrieve a single event by ID
  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  // Create a new event
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(newEvent);
  }

  // Update an existing event by ID
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    await this.findOne(id);
    await this.eventsRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  // Remove an event by ID
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.eventsRepository.delete(id);
  }
}
