// 这都能被你翻出来？喜欢F12是吧！
// 有兴趣帮柠檬找bug或者写bug的 请联系 2115386831@qq.com

var apiServer = 'https://api.hydcraft.cn';
var apiUrl = 'https://wiki.hydcraft.cn/api.php';

async function queryUserInfo(piic) {
    var apiUrl = apiServer + '/query/PlayerInfo.php';
    try {
        const response = await $.ajax({
            url: apiUrl,
            dataType: 'json',
            data: {
                piic: piic,
            }
        });

        return response;
    } catch (error) {
        console.error(error.statusText);
        return -1;
    }
}

let playerInfo = {};

function initPlayerProfile() {
    async function getWikiInfo(infoType) {
        try {
            const response = await $.ajax({
                url: apiUrl,
                dataType: 'json',
                data: {
                    action: 'query',
                    meta: 'userinfo',
                    format: 'json'
                }
            });
            
            if (infoType === 'id') {
                return response.query.userinfo.id;
            } else if (infoType === 'name') {
                return response.query.userinfo.name;
            } else {
                return null;
            }
        } catch (error) {
            return -1;
        }
    }
    
    async function checkWikiBind(wikiId) {
        var apiUrl = apiServer + '/query/CheckWikiBind.php';
        try {
            const response = await $.ajax({
                url: apiUrl,
                dataType: 'json',
                data: {
                    wikiId: wikiId
                }
            });
    
            if (response.status == 0) {
                return {
                    status: response.status,
                    piic: response.piic
                };
            } else {
                return {status: response.status};
            }
        } catch (error) {
            console.error(error.statusText);
            return -1; // 请求出错返回-1
        }
    }
    
    function loadPlayerCard() {
        $(".dh-player-info .player-basicinfo #nick").html(queryUserResult.playerlist.nick);
        $(".dh-player-info .player-basicinfo #id").html(queryUserResult.playerlist.id);
        $(".dh-player-info #piicinfo #code").html(queryUserResult.playerlist.piic);
        $(".dh-player-info .player-basicinfo #pic").attr("src", "https://minotar.net/avatar/" + queryUserResult.playerlist.id);
    
        var perGroup = queryUserResult.luckperms.primary_group;
        if (perGroup == "default")
            perGroup = 'C';
        else if (perGroup == "hydcb3")
            perGroup = 'B3';
        else if (perGroup == 'hydcb2')
            perGroup = 'B2';
        else if (perGroup == 'hydcb1')
            perGroup = 'B1';
        else if (perGroup == 'hydcb1_senior')
            perGroup = 'B1（Ⅱ类）';
        else if (perGroup == 'hydca2')
            perGroup = 'A2';
        else if (perGroup == 'hydca1')
            perGroup = 'A1';
        else
            perGroup = '未知';
        $('.dh-player-proinfo #pergroup .code').html(perGroup);
    
        const jointime = new Date(queryUserResult.playerlist.jointime).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
        $('.dh-player-proinfo #jointime .code').html(jointime);
    
        $('.dh-player-proinfo #sex .code').html(queryUserResult.playerlist.sex);
    }    

    function toggleBlurOverlay(enabled) {
        const container = document.querySelector('.citizen-page-container');
        if (enabled) {
            container.classList.add('blur-overlay'); // 添加样式
        } else {
            container.classList.remove('blur-overlay'); // 移除样式
        }
    }

    function deleteSpinner(enabled)  {
        const spinnerElement = document.querySelector('._nb-spinner');
        if (enabled) {
            spinnerElement.style.display = 'none';
        } else {
            spinnerElement.style.display = '';
        }
    }

    function showWikinoLogin(enabled)  {
        const element = document.querySelector('.wikiUser__noLogin');
        if (enabled) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    }

    function initProfileChunkLoad() {
        return new Promise((resolve, reject) => {
            function addJsFile(jsUrl) {
                var script = document.createElement("script");
                script.src = jsUrl;
                script.onload = resolve; // 脚本加载完成后 resolve Promise
                script.onerror = reject; // 脚本加载失败时 reject Promise
                document.head.appendChild(script);
            }
    
            addJsFile("https://api.hydcraft.cn/h2wiki/libraries/PlayerProfileChunk.js");
        });
    }

    function loadVersion() {
        dhDashboardVer = `Alpha V0.1 (Build 2307290017)`;
        $('.dh-infobox').after(`
            <div class="dh-footer-desc">
                <div class="dh-db-desc"></div>
                <div class="dh-db-version"></div>
            </div>
        `);

        $('.dh-db-desc').text(`「数字氢气」项目 © 氢气工艺服务器 2018-2023`);
        $('.dh-db-version').text(dhDashboardVer);
    }

    async function bindUserChunkLoad() {
        try {
            await initProfileChunkLoad();
            loadArray = ['profileInfo', 'ipPerGroup', 'unbindWikiAccount', 'cancelProfile'];
            profileChunkLoad(loadArray);
        } catch (error) {
            console.error(error);
        }
    }
    
    async function nobindUserChunkLoad() {
        try {
            await initProfileChunkLoad();
            loadArray = ['newPlayerReg', 'bindWikiAccount'];
            profileChunkLoad(loadArray);
        } catch (error) {
            console.error(error);
        }
    }

    /* 初始化 */
    window.toggleBlurOverlay = toggleBlurOverlay;
    toggleBlurOverlay(true);

    if (!$('.dh-footer-desc').length) {
        loadVersion();
    }

    (async function() {
        const result = await getWikiInfo('id');
        if (result != 0) { // 已登录 Wiki
            toggleBlurOverlay(false);
            deleteSpinner(true);

            $(".dh-player-card").css("position" , "relative");
            $(".dh-player-card").prepend(`<div class="_nb-spinner"></div>`);
            $(".dh-player-card").addClass("player-card__blur");

            const wikiId = await getWikiInfo('id');
            const bindResult = await checkWikiBind(wikiId);
            
            const wikiUsername = await getWikiInfo('name');
            $(".dh-subpage-header #player-info #id").text(wikiUsername);
            $(".dh-subpage-header #player-info #wikiID").text(wikiId);

            bindStatus = bindResult.status;
            playerCode = bindResult.piic;

            $(".dh-player-info .player-basicinfo #nick").before("<img id='pic' />");

            if (bindStatus === 0) { // 已绑定
                queryUserResult = await queryUserInfo(playerCode);
                playerInfo = queryUserResult;
                /* 加载卡片信息 */
                loadPlayerCard();
                $(".dh-player-card").css("position" , "unset");
                $(".dh-player-card").removeClass("player-card__blur");
                $(".dh-player-card ._nb-spinner").remove();
                
                /* 加载信息盒 */
                bindUserChunkLoad();
            } else { // 未绑定
                $(".dh-player-card").css("position" , "unset");
                $(".dh-player-card").removeClass("player-card__blur");
                $(".dh-player-card ._nb-spinner").remove();

                $(".dh-player-card").css("position" , "relative");
                $(".dh-player-card .dh-player-card__noLogin").css("display" , "unset");
                $(".dh-player-card").addClass("player-card__blur");
                
                /* 加载信息盒 */
                nobindUserChunkLoad();
            }

        } else { // 未登录
            deleteSpinner(true);
            showWikinoLogin(true);
        }
    })();
}

initPlayerProfile();