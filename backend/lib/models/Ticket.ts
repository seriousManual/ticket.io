import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm'

import Event from './Event'

@Entity()
class Ticket {
  @PrimaryGeneratedColumn('uuid')
  ticketId: string

  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @Column({ type: 'varchar', nullable: false })
  lastName: string

  @ManyToOne(() => Event, event => event.tickets, { onDelete: 'CASCADE' })
  event: Event
}

export default Ticket