'use strict'

$(document).ready(() => {
    $('#newPlaylist').click(e => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/playlist',
            data: {name: $('#newPlaylist').parent().prev().val()}
        }).then(
            res => $(location).attr('href', '/playlist/' + res.id)
        )
    })
})
