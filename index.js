$(function(){
   setTimeout(function(){
    $.get('./songs.json').then(function(Response){
    let items = Response
    items.forEach((i)=>{
        let $li = $(`
            <li>
                <a href="./song.html?id=${i.id}">
                    <h3>${i.name}<span>${i.singer}</span></h3>
                    <div class="songInfo">
                        <svg class="sq">
                            <use xlink:href="#icon-sq">
                            </use>
                        </svg>
                        <p>${i.songInfo}</p>
                        <svg class="playcircled">
                            <use xlink:href="#icon-play-circled">
                            </use>
                        </svg>
                    </div>
                </a>
            </li>
            `)
            $('#newsong').append($li)
    })
    $('#newsongloading').remove()
    }, function(){
    })
},500)
    $('.siteNav').on('click','ol.tab-items>li',function(e){
        let $li =$(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('tabChange',index)
        $('.tab-content>li').eq(index).addClass('active').siblings().removeClass('active')
    })

    $('.siteNav').on('tabChange',function(e,index){
        let $li = $('.tab-content>li').eq(index)
        if($li.attr('data-downloaded') === 'yes'){
            return
        }
        if(index === 1){
            $.get('./hotsongs.json').then((response)=>{
                // $li.text(response.content)
                $li.attr('data-downloaded','yes')
            })
        }else if(index === 2){
            // $.get('./search.json').then((response)=>{
            //     //$li.text(response.content)
            //     $li.attr('data-downloaded','yes')
            // })
        }
    })
    setTimeout(function(){
    $.get('./hotsongs.json').then(function(Response){
    let items = Response
    items.forEach((i)=>{
        let $li = $(`
                 <li>
                   <a href="./song.html?id=${i.id}">
                        <div class="number">${i.number}</div>
                        <div class="hotsongInfo">
                            <h3>${i.name}<span>${i.singer}</span></h3>
                        <svg class="sq">
                            <use xlink:href="#icon-sq">
                            </use>
                        </svg>
                        <p>${i.songInfo}</p>
                        <svg class="playcircled">
                            <use xlink:href="#icon-play-circled">
                            </use>
                        </svg>
                        </div>
                    </a>
                </li>
            `)
            $('#hotlist').append($li)
    })
    $('#hotsongloading').remove()
    }, function(){
    })
},1000)

let timer = undefined
    $('input#searchsong').on('input',function(e){
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if(value === ''){
            $('#searchoutput').text('')
            return
        }


        if(timer){
            clearTimeout(timer)
        }


        timer = setTimeout(function(){
            search(value).then((result)=>{
                timer = undefined
                 $(".searchkey").addClass('active')
                $('#searchoutput').children('li').remove()
                $('#searchoutput').children('p').remove()
                if(result.length !== 0 ){
                        $('.searchkey').removeClass('active')
                    for(var i=0;i<result.length;i++){
                        let $li = $(`
                <li>
                <a href="./song.html?id=${result[i].id}">
                    <h3>${result[i].name}<span>${result[i].singer}</span></h3>
                    <div class="songInfo">
                        <svg class="sq">
                            <use xlink:href="#icon-sq">
                            </use>
                        </svg>
                        <p>${result[i].songInfo}</p>
                        <svg class="playcircled">
                            <use xlink:href="#icon-play-circled">
                            </use>
                        </svg>
                    </div>
                </a>
            </li>
                                   `)
                                 
                                $('#searchoutput').append($li)
                         }
                }else{
                    $('.searchkey').removeClass('active')
                    let $p = '<p id="nosearch">暂无搜索结果</p>'
                    $('#searchoutput').append($p)
                }
            })
        },500)
    })

    function search(keyword){
        return new Promise((resolve,reject)=>{
            var database = [
                { "id":1,"name":"镜中人","singer":"","songInfo":"清弄 - 镜中人"},
                { "id":2,"name":"春意红包","singer":"","songInfo":"三无MarBlue / 祖娅纳惜 / 泠鸢yousa / 小缘 / 洛萱 / 不才"},
                { "id":3,"name":"若当来世","singer":"（狐妖小红娘 月红篇 OP）","songInfo":"冥月 / Mario - 狐妖小红娘 动画原声带"},
                { "id":4,"name":"我的一个道姑朋友","singer":"（Cover Lon）","songInfo":"双笙 - 我的一个道姑朋友"},
                { "id":5,"name":"刚好遇见你","singer":"","songInfo":"排骨教主 - 刚好遇见你"},
                { "id":6,"name":"万神纪","singer":"（VOCALOID）","songInfo":"肥皂菌丨珉珉的猫咪 - 万神纪"},
                { "id":7,"name":"小城谣","singer":"","songInfo":"泥鳅Niko / 翘课迟到少恭桑"},
                { "id":8,"name":"樱花樱花想见你","singer":"","songInfo":"李蚊香 / 满汉全席 - 【纯男声】满汉全席音乐团队"},
                { "id":9,"name":"四月は君の嘘","singer":"","songInfo":"横山克 - 四月は君の嘘 ORIGINAL SONG & SOUNDTRACK"},
                { "id":10,"name":"悠哉日常~悠哉~悠哉","singer":"","songInfo":"泠鸢yousa / Hanser / 泠鸢yousaの呆萌忆 - 悠哉日常~悠哉~悠哉"}
            ]

            let result = database.filter(function(item){
                return item.name.indexOf(keyword)>=0
            }
            })
            setTimeout(function(){
                resolve(result)
            },(Math.random () * 500 + 1000))
        })
    }
    window.search = search
})