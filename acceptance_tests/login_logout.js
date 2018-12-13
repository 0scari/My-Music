'use strict'
import { Selector } from 'testcafe';

fixture('Login/Logout Test')
    .page('http://localhost:3000');

test('LinkedIn login takes us to the user-space', async (t) => {
    // search github
    await t
        .click('#linkedinLogin')

    const exitBtnExists = await Selector('ul.nav.nav-pills.nav-stacked.custom-nav li').count

    await t
        .expect(exitBtnExists).eql(4);
})

test('Upon logout user is redirected to login page', async (t) => {
    // search github
    await t
        .click('#linkedinLogin')
        .click('#exit')

    const exitBtnExists = await Selector('#linkedinLogin').exists

    await t
        .expect(exitBtnExists).ok();
})
