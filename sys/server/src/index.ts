import arg from 'arg';
import { main } from 'app/src/index';

main();

setInterval(function () {
    // prevent nodejs quitting
}, 1000 * 60 * 60);
