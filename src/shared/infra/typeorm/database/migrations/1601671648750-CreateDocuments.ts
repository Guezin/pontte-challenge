import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDocuments1601671648750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documents',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },

          {
            name: 'personal_document',
            type: 'varchar'
          },

          {
            name: 'proof_of_income',
            type: 'varchar',
            isNullable: true
          },

          {
            name: 'immobile',
            type: 'varchar',
            isNullable: true
          },

          {
            name: 'contract_id',
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
            name: 'Contracts',
            columnNames: ['contract_id'],
            referencedTableName: 'contracts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('documents')
  }
}
