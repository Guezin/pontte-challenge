import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

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

  @Expose({ name: 'personal_document_url' })
  getPersonalDocumentUrl(): string | null {
    return this.personal_document
      ? `http://localhost:3333/files/${this.personal_document}`
      : null
  }

  @Expose({ name: 'proof_of_income_url' })
  getProofOfIncomeUrl(): string | null {
    return this.proof_of_income
      ? `http://localhost:3333/files/${this.proof_of_income}`
      : null
  }

  @Expose({ name: 'immobile_url' })
  getImmobileUrl(): string | null {
    return this.immobile ? `http://localhost:3333/files/${this.immobile}` : null
  }

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Document
