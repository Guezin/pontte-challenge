import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('contracts')
class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  cpf: string

  @Column()
  loan_amount: number

  @Column()
  monthly_income: number

  @Column()
  date_of_birth: string

  @Column()
  marital_status: string

  @Column()
  address: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Contract
