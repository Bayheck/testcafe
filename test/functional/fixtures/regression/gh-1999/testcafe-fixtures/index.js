import { Selector } from 'testcafe';

fixture `GH-1999 - Shouldn't raise an error if an iframe has html in src`
    .page `http://example.com`;

class Page {
    constructor () {
        this.main             = Selector('div').withText('Example Domain');
        this.text            = Selector('p').withText('This domain is for use in illustrative examples in');
    }
}

const page = new Page();

test('Click in iframe', async t => {
    await t
        // .click(page.main);
        .debug(page.main);
    // .click(page.text);
});
