/**
 * Created by mohammad on 3/18/2019 AD.
 */

import Formatter from './formatter';


class MarkdownFormatter extends Formatter {

    constructor(outfile) {
        super(outfile);
    }

    _writeLine(text='') {
        this.write(`${text}\n`);
    }

    writeHeader(text, level=1) {
        this._writeLine(`${'#'.repeat(level)} ${text}\n`);
    }

    writeParagraph(text) {
        this._writeLine(text);
        this._writeLine();
    }

    _writeTableRow(row=[]) {
        this._writeLine(row.join(' | '));
    }

    writeTable(array2d, headers=[]){
        let columns = array2d[0].length;

        if (headers.length === 0) {
            headers = [...new Array(columns)].map((_, i) => `Column${i+1}`)
        }

        this._writeTableRow(headers);
        this._writeLine(`${[...new Array(columns)].map((_, i) => '---').join('|')}`);

        for (let row of array2d) {
            this._writeTableRow(row);
        }

        this._writeLine();
    }

    writeList(list) {
        for (let element of list ) {
            this._writeLine(`* ${element}`);
        }
        this._writeLine();
    }

}

export default MarkdownFormatter;