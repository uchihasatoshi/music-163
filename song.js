$(function () {

    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1], 10)
    $.get('./songs.json').then(function (response) {
        let songs = response
        let song = songs.filter(s=>s.id === id)[0]
        let {url,name,lyric} = song

        initPlayer.call(undefined,url)
        initText(name,lyric)

    })
        $.get('./hotsongs.json').then(function (response) {
        let songs = response
        let song = songs.filter(s=>s.id === id)[0]
        let {url,name,lyric} = song

        initPlayer.call(undefined,url)
        initText(name,lyric)

    })

    function initPlayer(url){
    let audio = document.createElement('audio')
        audio.src = url
        audio.oncanplay = function () {
            audio.pause()
            // $('.disc-container').addClass('playing')
            var styles = {
            // transition:".5s ease-in-out",
            transform:"rotateZ(-14deg)"
       }
            $('.pointer').css(styles)  
        }

        $('.icon-pause').on('touchstart', function () {
            audio.pause()
            $('.disc-container').removeClass('playing')
            var styles = {
            transition:".5s ease-in-out",
            transform:"rotateZ(-14deg)"
       }
            $('.pointer').css(styles)  
    })

        $('.icon-play').on('touchstart', function () {
            audio.play()
            $('.disc-container').addClass('playing')
            var styles = {
           transform:"rotateZ(0deg)"
       }
            $('.pointer').css(styles) 
        })
        setInterval(()=>{
            let seconds = audio.currentTime
            let minutes = ~~(seconds/60)
            let left = seconds - minutes * 60
            let time = `${pad(minutes)}:${pad(left)}`
            let $lines = $('.lines > p')
            let $whichline
            for(let i =0;i<$lines.length;i++){
                let currentLineTime = $lines.eq(i).attr('data-time')
                let nextLineTime = $lines.eq(i+1).attr('data-time')
                if($lines.eq(i+1).length !== 0 && currentLineTime < time && nextLineTime > time){
                    $whichline = $lines.eq(i)
                    break
                }
            }
            if($whichline){
                $whichline.addClass('active').prev().removeClass('active')
                let top = $whichline.offset().top
                let linesTop = $('.lines').offset().top
                let singleline = $('.lyric').height()/3 
                let delta = top - linesTop - singleline
                $('.lines').css('transform',`translateY(-${delta}px)`)
            }
        },10)
    }

    function pad(number){
        return number >=10 ? number+'':'0' + number
    }

    function initText(name,lyric){
        $('.song-description>h2').text(name)
        parseLyric(lyric)
    }

    function parseLyric(lyric){
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function (string, index) {
            let matches = string.match(regex)
            if (matches) {
                return {
                    time: matches[1],
                    words: matches[2]
                }
            }
        })

        // console.log(array)
        let $lyric = $('.lyric')
        array.map(function (object) {
            if (!object) {return}
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    }
        

    $.get('./songs.json').then(function(response){
        let songs =response
        let song = songs.filter(s=>s.id === id)[0]
        let {backgroundImage} = song
        let $img = $('#img')
        $img.css("background-image",`url(${backgroundImage})`)
    })
        $.get('./songs.json').then(function(response){
        let songs =response
        let song = songs.filter(s=>s.id === id)[0]
        let {cover} = song
        let $cover = $('.cover')
        console.log($cover)
        $cover[0].src = cover
    })
        $.get('./hotsongs.json').then(function(response){
        let songs =response
        let song = songs.filter(s=>s.id === id)[0]
        let {backgroundImage} = song
        let $img = $('#img')
        $img.css("background-image",`url(${backgroundImage})`)
    })
        $.get('./hotsongs.json').then(function(response){
        let songs =response
        let song = songs.filter(s=>s.id === id)[0]
        let {cover} = song
        let $cover = $('.cover')
        console.log($cover)
        $cover[0].src = cover
    })

})