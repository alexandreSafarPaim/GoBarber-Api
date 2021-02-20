import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateAppointments1609816505884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //alterações que vão ser feitas no banco de dados ao executar essa migration
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //desfar o que foi feito me metodo up
    await queryRunner.dropTable('appointments')
  }
}