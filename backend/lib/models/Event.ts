import {
    Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, CreateDateColumn
} from 'typeorm'

import Ticket from './Ticket'

@Entity()
class Event {
  @PrimaryGeneratedColumn('uuid')
  eventId: string

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'datetime', nullable: false })
  date: Date

  @Column({ type: 'text', nullable: false })
  city: string

  @OneToMany(() => Ticket, ticket => ticket.event, { onDelete: 'CASCADE' })
  tickets: Ticket[]
}

export default Event