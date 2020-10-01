import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import Contract from './Contract'

@Entity('approval')
class Approval {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('boolean', { default: false })
  status: boolean

  @Column()
  contract_id: string

  @OneToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Approval
