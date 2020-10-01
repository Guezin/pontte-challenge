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

@Entity('assets')
class Assets {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  cnh_or_cpf: string

  @Column()
  proof_of_income: string

  @Column()
  immobile: string

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

export default Assets
