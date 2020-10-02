import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1601668930520 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },

          {
            name: 'name',
            type: 'varchar'
          },

          {
            name: 'email',
            type: 'varchar'
          },

          {
            name: 'cpf',
            type: 'varchar'
          },

          {
            name: 'monthly_income',
            type: 'decimal',
            isNullable: true,
            precision: 10,
            scale: 2
          },

          {
            name: 'date_of_birth',
            type: 'varchar',
            isNullable: true
          },

          {
            name: 'marital_status',
            type: 'varchar',
            isNullable: true
          },

          {
            name: 'address',
            type: 'varchar',
            isNullable: true
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
