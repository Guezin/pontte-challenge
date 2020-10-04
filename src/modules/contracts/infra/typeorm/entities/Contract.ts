import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import Document from '@modules/documents/infra/typeorm/entities/Document'
import User from '@modules/users/infra/typeorm/entities/User'

@Entity('contracts')
class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('decimal')
  loan_amount: number

  @Column('enum', { default: 'creation' })
  state: 'creation' | 'upload_of_images' | 'approval' | 'approved' | 'rejected'

  @Column()
  user_id: string

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  document_id: string

  @OneToOne(() => Document)
  @JoinColumn({ name: 'document_id' })
  documents: Document

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Contract
