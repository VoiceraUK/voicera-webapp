import { Complaint, StationScore } from '../../types';
import { calculateStationScores } from '../../utils/functions';
import knex, { DB_TABLE } from '../../utils/knex';
import { run } from '../utils';

run(main);

async function main() {
  const complaints = await knex(DB_TABLE).select<Complaint[]>();
  const scores = calculateStationScores(complaints);
  printScores(scores);
}

/**
 * Prints the scores to the console in a user-friendly format.
 * @param stationScores The mapping containing scores of each station.
 */
function printScores(stationScores: StationScores) {
  console.info('---');
  Object.entries(stationScores).forEach(([station, score], i, array) => {
    console.info(`**** Station #${i + 1}: ${station}`);
    console.info('> Number of Complaints: ' + score.numberOfComplaints);
    console.info('> Percentage Addressed: ' + score.percentageAddressed);
    console.info('> Percentage Resolved: ' + score.percentageResolved);
    console.info('> Avg. Addressal Time: ' + score.averageAddressalTime);
    console.info('> Avg. Resolution Time: ' + score.averageResolutionTime);
    console.info('**** Score: ' + score.finalScore + ' / 100 ****');

    const isLastItem = i === array.length - 1;
    console.info(isLastItem ? '---' : '');
  });
}

type StationScores = {
  [key: string]: StationScore;
};
