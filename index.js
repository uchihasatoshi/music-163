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
            $.get('./search.json').then((response)=>{
                //$li.text(response.content)
                $li.attr('data-downloaded','yes')
            })
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
                { "id":1,"name":"一笑倾城","singer":"","songInfo":"汪苏泷 / 明柏辰&明筱岩 / 陈墨一 / 杨梓鑫 - 我想和你唱 第二季 第9期"},
                { "id":2,"name":"最美","singer":"(原唱：羽泉)","songInfo":"陈赫 - 2017跨界歌王 第十一期"},
                { "id":3,"name":"소나기","singer":"","songInfo":"Oohyo-비밀의 숲 OST Part.3"},
                { "id":4,"name":"不为谁而作的歌","singer":"","songInfo":"林俊杰-天生是优我 第十二期"},
                { "id":5,"name":"失约","singer":"","songInfo":"Twins-花约"},
                { "id":6,"name":"下一站茶山刘","singer":"","songInfo":"房东的猫-拾贰"},
                { "id":7,"name":"泡沫","singer":"","songInfo":"G.E.M.邓紫棋 / 余赛亚 / 戴斯琪 / 肖茗-我想和你唱 第二季 第9期"},
                { "id":8,"name":"成都","singer":"(原唱：赵雷)","songInfo":"张继科-2017跨界歌王 第十一期"},
                { "id":9,"name":"新贵妃醉酒","singer":"","songInfo":"李玉刚 / 徐天意 / 杨姣 / 祝颂皓 - 我想和你唱 第二季 第9期"},
                { "id":10,"name":"父亲写的散文诗","singer":"(原唱：许飞)","songInfo":"姚晨-2017跨界歌王 第十一期"},
                { "id":11,"name":"追光者","singer":"电视剧《夏至未至》插曲","songInfo":"岑宁儿-夏至未至 影视原声带"},
                { "id":12,"name":"童话镇","singer":"","songInfo":"陈一发儿-童话镇"},
                { "id":13,"name":"成都","singer":"","songInfo":"赵雷-成都"},
                { "id":14,"name":"安和桥","singer":"","songInfo":"宋冬野-安和桥北"},
                { "id":15,"name":"暧昧","singer":"","songInfo":"薛之谦-暧昧"},
                { "id":16,"name":"说散就散","singer":"","songInfo":"JC-说散就散"},
                { "id":17,"name":"刚好遇见你","singer":"","songInfo":"李玉刚-刚好遇见你"},
                { "id":18,"name":"全部都是你","singer":"","songInfo":"Dragon Pig / CNBALLER / CLOUD WANG-全部都是你"},
                { "id":19,"name":"Shape of You","singer":"","songInfo":"Ed Sheeran-Shape Of You"},
                { "id":21,"name":"Despacito (Remix)","singer":"","songInfo":"Luis Fonsi / Daddy Yankee / Justin Bieber-Despacito (Remix)"},
                { "id":22,"name":"小半","singer":"","songInfo":"陈粒-小梦大半"},
                { "id":23,"name":"마지막처럼 ","singer":"","songInfo":"BLACKPINK-마지막처럼"}
            ]

            let result = database.filter(function(item){      
                return item.name.indexOf(keyword)>=0
            })
            setTimeout(function(){
                resolve(result)
            },(Math.random () * 500 + 1000))  
        })
    }
    window.search = search
})