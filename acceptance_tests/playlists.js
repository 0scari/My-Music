'use strict'
import { Selector } from 'testcafe';

fixture('Playlist operation tests')
    .page('http://localhost:3000');

const playlistName = 'TEST'

test('Playlist can be created', async (t) => {
    // search github
    await t
        .click('#linkedinLogin')
        .click('ul.nav.nav-pills.nav-stacked.custom-nav li:nth-child(3)')
        .typeText('div.input-group [type=text]', playlistName)
        .click('#newPlaylist')

    const newPlaylistBtn = Selector('#deletePlaylist')

    await t
        .expect(newPlaylistBtn.exists).ok()
})

test('Playlist can be renamed', async (t) => {
    // search github
    await t
        .click('#linkedinLogin')
        .click('ul.nav.nav-pills.nav-stacked.custom-nav li:nth-child(3)')
        .click('#page-wrapper > div.inner-content > div.music-browse > div > div:nth-last-child(2) > a.sing')
        .click('#page-wrapper > div.inner-content.single > div.single_left > div > div > div.btn-group.btn-group-justified > div:nth-child(2) > button')
        .typeText('#editPlaylistForm > input[type="text"]:nth-child(2)', 'X')
        .click('#editPlaylistForm > input[type="submit"]:nth-child(5)')

    const newPlaylistName = Selector('#page-wrapper > div.inner-content.single > div.tittle-head > h3').innerText

    await t
        .expect(newPlaylistName).eql('X')
})

test('Added songs appear in playlist song list', async (t) => {
    // search github
    await t
        .click('#linkedinLogin')
        .click('ul.nav.nav-pills.nav-stacked.custom-nav li:nth-child(3)')
        .click('#page-wrapper > div.inner-content > div.music-browse > div > div:nth-last-child(2) > a.sing')
        .click('#page-wrapper > div.inner-content.single > div.single_left > div > div > div.btn-group.btn-group-justified > div:nth-child(3) > button')
        .typeText('#addSongForm > input[type="text"]:nth-child(2)', 'a')
        .typeText('#addSongForm > input[type="text"]:nth-child(3)', 'b')
        .click('#addSongForm > input[type=submit]')

    const playlistItems = Selector('#page-wrapper > div.inner-content.single > div.single_left > div > div > div.music-player > ul > li')

    await t
        .expect(playlistItems.count).eql(1)
})

test('Test playlist deletion', async (t) => {
    // search github
    await t
        .click('#linkedinLogin')
        .click('ul.nav.nav-pills.nav-stacked.custom-nav li:nth-child(3)')
        .click('#page-wrapper > div.inner-content > div.music-browse > div > div:nth-last-child(2) > a.sing')
        .click('#deletePlaylist')

    const newPlaylistBtn = Selector('#newPlaylist')

    await t
        .expect(newPlaylistBtn.exists).ok()
})

