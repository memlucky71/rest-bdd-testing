/**
 * Created by mohammad on 3/18/2019 AD.
 */
const fs = require('fs');


class Formatter {
    constructor(outfile) {
        this.file = outfile
    }

    write(text) {
        try {
            fs.appendFileSync(this.file, text);
        } catch (err) {
            /* Handle the error */
        }
    }

    writeHeader(text, level=1) {
        throw new Error('This method should be implemented in the child class');
    }

    writeParagraph(text) {
        throw new Error('You have to implement the method doSomething!');
    }

    writeTable(array2d, headers=null) {
        throw new Error('You have to implement the method doSomething!');
    }

    writeList(items) {
        throw new Error('You have to implement the method doSomething!');
    }

}

export default Formatter;