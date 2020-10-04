import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateContracts1601671635030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contracts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },

          {
            name: 'loan_amount',
            type: 'decimal',
            precision: 10,
            scale: 2
          },

          {
            name: 'state',
            type: 'enum',
            enum: [
              'creation',
              'upload_of_images',
              'approval',
              'approved',
              'rejected'
            ],
            default: "'creation'"
          },

          {
            name: 'user_id',
            type: 'uuid'
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
        ],
        foreignKeys: [
          {
            name: 'User',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contracts')
  }
}
