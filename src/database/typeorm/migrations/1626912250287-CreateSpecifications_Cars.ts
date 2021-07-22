import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line
export class CreateSpecificationsCars1626912250287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          { name: 'car_id', type: 'uuid' },
          { name: 'specification_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'fk_SpecificationId_SpecificationsCars',
        columnNames: ['specification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'specifications',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'fk_CarId_SpecificationsCars',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'fk_SpecificationId_SpecificationsCars',
    );
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'fk_CarId_SpecificationsCars',
    );
    await queryRunner.dropTable('specifications_cars');
  }
}
