import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('contracts')
class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('decimal')
  loan_amount: number

  @Column('enum', { default: 'creation' })
  state: 'creation' | 'upload_of_images' | 'approval'

  @Column()
  user_id: string

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Contract
