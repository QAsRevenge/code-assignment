import {createUmzug} from './createUmzug';
import {initSequelize} from './initSequelize';

const umzug = createUmzug(initSequelize(), true);
export type Migration = typeof umzug._types.migration;

umzug.runAsCLI();
