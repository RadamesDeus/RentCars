import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
export class CreateCarsSpecifications1627136436809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars_specifications',
        columns: [
          { name: 'car_id', type: 'uuid' },
          { name: 'specification_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'cars_specifications',
      new TableForeignKey({
        name: 'fk_CarsSpecifications_SpecificationId',
        columnNames: ['specification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'specifications',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'cars_specifications',
      new TableForeignKey({
        name: 'fk_CarsSpecifications_CarId',
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
      'cars_specifications',
      'fk_CarsSpecifications_SpecificationId',
    );
    await queryRunner.dropForeignKey(
      'cars_specifications',
      'fk_CarsSpecifications_CarId',
    );
    await queryRunner.dropTable('cars_specifications');
  }
}
