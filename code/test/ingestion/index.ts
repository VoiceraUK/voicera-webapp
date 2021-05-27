import { Complaint } from '../../types';
import knex, { DB_SCHEMA, DB_TABLE } from '../../utils/knex';

const NUM_OF_RECORDS = process.argv[2] || 100;

(async () => {
  try {
    await createTables();
    console.info('Table (re)created.');

    await ingestData();
    console.info(`${NUM_OF_RECORDS} records ingested.`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
})();

function createTables() {
  return knex.schema
    .withSchema(DB_SCHEMA)
    .dropTableIfExists(DB_TABLE)
    .createTable(DB_TABLE, (table) => {
      table.increments('id', { primaryKey: true });
      table.string('reportId', 15);
      table.string('station', 100);
      table.dateTime('startDate');
      table.dateTime('endDate');
      table.string('incidentType', 20);
      table.text('incidentDescription');
      table.string('status', 20);
      table.text('notes');
      table.string('city', 50);
      table.string('county', 50);
      table.decimal('latitude', 18, 15);
      table.decimal('longitude', 18, 15);
      table.integer('complainantAge', 2).unsigned();
      table.string('complainantRace', 15);
      table.integer('complainantSex', 1).unsigned();
      table.string('officerId', 15);
      table.integer('officerAge', 2).unsigned();
      table.string('officerRace', 15);
      table.integer('officerSex', 1).unsigned();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
}

function ingestData() {
  const complaints: Complaint[] = [];

  for (let i = 1; i <= NUM_OF_RECORDS; i++) {
    const complaint = Complaint.random();
    complaint.reportId = 'COM' + i.toString().padStart(4, '0');
    complaints.push(complaint);
  }

  return knex(DB_TABLE).insert(complaints);
}
