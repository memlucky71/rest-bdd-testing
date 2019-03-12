/**
 * Created by mohammad on 3/12/2019 AD.
 */

import Documenter from '../lib/documenter';

const dirPath = `${__dirname}/docs`;
const branchName = 'test';

global.docPath = `${dirPath}/${branchName}`;
global.documenter = new Documenter(dirPath, branchName);