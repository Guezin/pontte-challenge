import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import Contract from '@modules/contracts/infra/typeorm/entities/Contract'

@Entity('documents')
class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  personal_document: string

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

export default Document
