// 这都能被你翻出来？喜欢F12是吧！
// 有兴趣帮柠檬找bug或者写bug的 请联系 2115386831@qq.com

async function getWikiId() {
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
        return response.query.userinfo.id;
    } catch (error) {
        console.error(error.statusText);
        return -1;
    }
}

function showWindowsBox(bgElement, fgElement, showElement){
    $(bgElement).css("position" , "relative");
    $(bgElement).addClass("chunkBlur");
    
    $(bgElement).prepend(showElement);
    
    $(fgElement).css("position" , "absolute");
    $(fgElement).css("top" , "50%");
    $(fgElement).css("left" , "50%");
    $(fgElement).css("transform" , "translate(-50%, -50%)");
}

function cleanWindowsBox(bgElement, fgElement){
    $(bgElement).css("position" , "unset");
    $(bgElement).removeClass("chunkBlur");
    
    $(fgElement).css("position" , "unser");
    $(fgElement).css("transform" , "unset");
    
    $(fgElement).remove();
}

function addScript(scriptUrl) {
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    document.head.appendChild(scriptElement);
}

function profileChunkLoad(chunkArray) {
    var infobox = document.querySelector('.dh-infobox');
    
    function getIPInfo(ipAddress) {
        var apiUrl = `https://api.vore.top/api/IPdata?ip=${ipAddress}`;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: apiUrl,
                dataType: 'json',
                success: function(data) {
                    resolve({
                        regionName: data.ipdata.info1,
                        city: data.ipdata.info2
                    });
                },
                error: function() {
                    resolve({ 
                        regionName: "未知",
                        city: "未知"
                    });
                }
            });
        });
    }
    
    /**
     * newPlayerReg
     */
    if (chunkArray.includes('newPlayerReg')) {
        var apiUrl = 'https://wiki.hydcraft.cn/api.php';
    
        async function getWikiId() {
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
                return response.query.userinfo.id;
            } catch (error) {
                console.error(error.statusText);
                return -1;
            }
        }
        
        infobox.innerHTML += `
            <div class="dh-block" id="newPlayerReg">
                <div class="title">新玩家信息注册</div>
    
                <div class="note">
                    <li>如果您是新玩家，从未进入过服务器，在您注册完 Wiki 账户后，请在此处输入您的信息，系统将会自动注册您的信息到玩家数据库。</li>
                </div>
    
                <form id="registration-form">
                    <div class="grid-item" id="first">
                        <label for="player-id">游戏 ID</label>
                        <input type="text" id="player-id" name="player-id" required>
                    </div>
        
                    <div class="grid-item" id="second">
                        <label for="player-nickname">昵称</label>
                        <input type="text" id="player-nickname" name="player-nickname" required>
                    </div>
        
                    <div class="grid-item" id="third">
                        <label for="player-gender">性别</label>
                        <select id="player-gender" name="player-gender" required>
                            <option value="1">男</option>
                            <option value="2">女</option>
                            <option value="3">不透露</option>
                        </select>
                    </div>
        
                    <div class="grid-item" id="fourth">
                        <label for="contact-method">联系方式</label>
                        <div id="con-method-box">
                            <select id="contact-method" name="contact-method" required>
                                <option value="qq">QQ</option>
                                <option value="wechat">微信</option>
                                <option value="bilibili">哔哩哔哩</option>
                                <option value="email">电子邮箱</option>
                                <option value="other">其它</option>
                            </select>
                            <input type="text" id="contact-number" name="contact-number" required>
                        </div>
                    </div>
            
                    <button type="button" onclick="playerRegister()">提交</button>
                </form>
            </div>
        `;
        addScript("https://api.hydcraft.cn/h2wiki/assets/crypto-js.min.js");
    }

    /**
     * bindWikiAccount
     */
    if (chunkArray.includes('bindWikiAccount')) {
        infobox.innerHTML += `
            <div class="dh-block" id="bindWikiAccount">
                <div class="title">绑定账号</div>
    
                <div class="note">
                    <li>如果您已在服务器内注册账户，但是没有绑定游戏信息到 Wiki 账户，则需要您绑定账号。绑定账户后，即可开始您的数字生活。</li>
                    <li>对于未登陆过服务器，但在玩家列表在有登记信息的玩家。您可以查询玩家列表中的信息，将主要信息复制到此处进行绑定。</li>
                </div>
    
                <form id="bind-account-form">
                    <label for="authme-account">服务器登录账号与密码</label>
                    <div id="authme-form">
                        <input type="text" id="authme-account" name="authme-account" placeholder="账户">
                        <input type="text" id="authme-password" name="authme-password" placeholder="密码">
                    </div>
                    
                    <label for="key-name">提交其他信息</label>
                    <div id="authme-form">
                        <select id="key-name" name="key-name">
                            <option value="piic">PIIC</option>
                            <option value="nick">昵称</option>
                            <option value="id">ID</option>
                        </select>
                        <input type="text" id="key-info" name="key-info" placeholder="输入选择类型的信息">
                    </div>
    
                    <button type="button" onclick="bindAccount()">绑定账户</button>
                </form>
            </div>
        `;
    }

    /**
     * profileInfo
     */
    if (chunkArray.includes('profileInfo')) {
        infobox.innerHTML += `
            <div class="dh-block" id="profileInfo">
                <div class="title">档案概要</div>
    
                <svg id="barcode"></svg>
    
                <div class="grid">
                    <div class="grid-item">
                        <div class="name">游戏 ID</div>
                        <div class="info" id="id"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">昵称</div>
                        <div class="info" id="nick"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">入服日期</div>
                        <div class="info" id="jointime"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">权限组</div>
                        <div class="info" id="perGroup"></div>
                    </div>
                    
                    <div class="grid-item">
                        <div class="name">性别</div>
                        <div class="info" id="sex"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">玩家类型</div>
                        <div class="info" id="playerType"></div>
                    </div>
                    
                    <div class="grid-item">
                        <div class="name">玩家状态</div>
                        <div class="info" id="playerStatus"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">服务器账号注册日期</div>
                        <div class="info" id="regDate"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">最近登录时间</div>
                        <div class="info" id="lastLogin"></div>
                    </div>
                    
                    <div class="grid-item">
                        <div class="name">登录的 IPv4 地址</div>
                        <div class="info" id="lastIP"></div>
                        <div class="info" id="IPregion"></div>
                    </div>
                </div>
            </div>

            <div class="dh-block" id="playerProfileInfo">
                <div class="title">玩家信息</div>
    
                <svg id="barcode"></svg>
    
                <div class="grid">
                    <div class="grid-item">
                        <div class="name">游戏 ID</div>
                        <div class="info" id="id"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">昵称</div>
                        <div class="info" id="nick"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">入服日期</div>
                        <div class="info" id="jointime"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">权限组</div>
                        <div class="info" id="perGroup"></div>
                    </div>
                    
                    <div class="grid-item">
                        <div class="name">性别</div>
                        <div class="info" id="sex"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">玩家类型</div>
                        <div class="info" id="playerType"></div>
                    </div>
                    
                    <div class="grid-item">
                        <div class="name">玩家状态</div>
                        <div class="info" id="playerStatus"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">服务器账号注册日期</div>
                        <div class="info" id="regDate"></div>
                    </div>
                
                    <div class="grid-item">
                        <div class="name">最近登录时间</div>
                        <div class="info" id="lastLogin"></div>
                    </div>
                    
                    <div class="grid-item">
                        <div class="name">登录的 IPv4 地址</div>
                        <div class="info" id="lastIP"></div>
                        <div class="info" id="IPregion"></div>
                    </div>
                </div>
            </div>
        `;

        // 档案概要
        generateBarcode(playerInfo);
        
        $("#profileInfo #id").text(playerInfo.playerlist.id);
        $("#profileInfo #nick").text(playerInfo.playerlist.nick);
        
        if (playerInfo.luckperms.primary_group == 'default')
            perGroup = 'C';
        else if (playerInfo.luckperms.primary_group == 'hydcb3')
            perGroup = 'B3';
        else if (playerInfo.luckperms.primary_group == 'hydcb2')
            perGroup = 'B2';
        else if (playerInfo.luckperms.primary_group == 'hydcb1')
            perGroup = 'B1';
        else if (playerInfo.luckperms.primary_group == 'hydcb1_senior')
            perGroup = 'B1（Ⅱ类）';
        else if (playerInfo.luckperms.primary_group == 'hydca2')
            perGroup = 'A2';
        else if (playerInfo.luckperms.primary_group == 'hydca1')
            perGroup = 'A1';
        else
            perGroup = '未知';
        $("#profileInfo #perGroup").text(perGroup);
        
        $("#profileInfo #jointime").text(playerInfo.playerlist.jointime);
        $("#profileInfo #sex").text(playerInfo.playerlist.sex);
        
        if (playerInfo.playerlist.type == 0)
            $("#profileInfo #playerType").text("正式玩家（参与成员）");
        else if (playerInfo.playerlist.type == 1)
            $("#profileInfo #playerType").text("正式玩家（普通成员）");
        else if (playerInfo.playerlist.type == 2)
            $("#profileInfo #playerType").text("非正式玩家");
            
        if (playerInfo.playerlist.status == 0)
            $("#profileInfo #playerStatus").text("正常");
        else if (playerInfo.playerlist.type == 1)
            $("#profileInfo #playerStatus").text("冬眠计划玩家");
        else if (playerInfo.playerlist.type == 2)
            $("#profileInfo #playerStatus").text("已离开玩家");
        else if (playerInfo.playerlist.type == 3)
            $("#profileInfo #playerStatus").text("被移除玩家");
        
        if (playerInfo.authme.regdate != -1)
            $("#profileInfo #regDate").text(playerInfo.authme.regdate);
        else
            $("#profileInfo #regDate").text("无数据");

        if (playerInfo.authme.lastlogin != -1)
            $("#profileInfo #lastLogin").text(playerInfo.authme.lastlogin);
        else
            $("#profileInfo #lastLogin").text("无数据");

        if (playerInfo.authme.ip != -1)
            $("#profileInfo #lastIP").text(playerInfo.authme.ip);
        else
            $("#profileInfo #lastIP").text("无数据");

        if (playerInfo.authme.ip != -1) {
            getIPInfo(playerInfo.authme.ip)
            .then((ipInfo) => {
                var regionName = ipInfo.regionName;
                var city = ipInfo.city;
                $("#profileInfo #IPregion").text("（" + regionName + ', ' + city + "）");
            })
        } else
            $("#profileInfo #IPregion").text("无数据");
        // $("#profileInfo #isLogged").text(playerInfo.authme.isLogged ? "是" : "否");
    }

    /**
     * ipPerGroup
     */
    if (chunkArray.includes('ipPerGroup')) {
        infobox.innerHTML += `
            <div class="dh-block" id="ipPerGroup">
                <div class="title">非正式玩家权限组</div>
    
                <div class="note">
                    <li>新玩家直接进入服务器后，属“非正式玩家”。最高可获得B3等级的权限组。除 WorldEdit 操作数量限制以外，均与正式玩家无差异。非正式玩家可提交转正申请，通过与否根据玩家自身情况评估。</li>
                    <li>此处可以修改非正式玩家的权限组等级。请注意，只有进入过服务器的玩家才能修改，请新玩家进入服务器后再设置权限组。</li>
                </div>
    
                <form id="newplayer-per-form">
                    <label for="player-per">权限组</label>
                    <select id="player-per" name="player-per" required>
                        <option value="1">C</option>
                        <option value="2">B3</option>
                    </select>
                    <button type="button" onclick="ipPerChange()">更改</button>
                </form>
            </div>
        `;
    }

    // unbindWikiAccount
    if (chunkArray.includes('unbindWikiAccount')) {
        infobox.innerHTML += `
            <div class="dh-block" id="unbindWikiAccount">
                <div class="title">解除绑定</div>
    
                <div class="note">
                    <li>如果您需要重新绑定账号，可以通过此选项重置。</li>
                </div>
    
                    <button type="button" onclick="unbindAccount()">解除绑定账户</button>
                </form>
            </div>
        `;
    }
    
    // cancelProfile
    if (chunkArray.includes('cancelProfile')) {
        infobox.innerHTML += `
            <div class="dh-block" id="cancelProfile">
                <div class="title">退服登记</div>
    
                <div class="note">
                    <li>若您因某些原因需要离开服务器，可通过此选项登记，待管理员确认后即可注销信息。</li>
                </div>
    
                <form id="cancel-profile-form">
                    <label for="reason">离开缘由</label>
                    <input type="text" id="reason" name="reason" required>
                    <button type="button" onclick="ipPerChange()">提交申请</button>
                </form>
            </div>
        `;
    }
}

/* 玩家注册 */
async function playerRegister() {
    function hashData(data) {
        const dataString = Object.values(data).join('');
        const hash = CryptoJS.SHA256(dataString).toString();
        return hash;
    }
    
    showWindowsBox("#newPlayerReg", "#newPlayerReg__regDone", `
    <div id="newPlayerReg__regDone">
        <div class="_nb-spinner"></div>
        <div class="wb-tips">初始化加载模块</div>
    </div>
    `);
    
    const playerId = $('#player-id').val();
    const playerNickname = $('#player-nickname').val();
    const playerGender = $('#player-gender').val();
    const contactMethod = $('#contact-method').val();
    const contactNumber = $('#contact-number').val();
    const wikiId = await getWikiId();
    
    if (playerId === '' || playerNickname === '' || playerGender === '' || contactMethod === '' || contactNumber === '') {
        $("#newPlayerReg__regDone ._nb-spinner").remove();
        $("#newPlayerReg__regDone").prepend(`
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
        `);
        $("#newPlayerReg__regDone .wb-tips").text("必须填写内容");
        
        setTimeout(function() {
            cleanWindowsBox("#newPlayerReg", "#newPlayerReg__regDone");
        }, 2000);
    return;
    }
    
    $("#newPlayerReg__regDone .wb-tips").text("获取 Wiki 用户ID");

    const data = {
      id: playerId,
      nick: playerNickname,
      sex: playerGender,
      contact_type: contactMethod,
      contact_number: contactNumber,
      wikiId: wikiId
    };
    
    const hashedData = hashData(data);
    const baseUrl = 'https://api.hydcraft.cn/opreate/NewPlayerRegister.php';
    
    $("#newPlayerReg__regDone .wb-tips").text("提交注册信息");
    
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            key: hashedData
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == -1) {
            $("#newPlayerReg__regDone ._nb-spinner").remove();
            $("#newPlayerReg__regDone").prepend(`
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            `);
            $("#newPlayerReg__regDone .wb-tips").text("注册失败");
            
            setTimeout(function() {
                cleanWindowsBox("#newPlayerReg", "#newPlayerReg__regDone");
            }, 2000);
        } else if (data.status == 0) {
            $("#newPlayerReg__regDone ._nb-spinner").remove();
            $("#newPlayerReg__regDone").prepend(`
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="36px" height="36px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16.17L5.83 13l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            `);
            $("#newPlayerReg__regDone .wb-tips").text("注册成功。PIIC 为" + data.piic + "。");
            
            setTimeout(function() {
                $("#newPlayerReg__regDone .wb-tips").text("页面将重载");
                $("script[src='https://api.hydcraft.cn/h2wiki/resources/player_profile.js']").remove();
                $(".dh-block").remove();
                
                $(".dh-player-card").css("position" , "unser");
                $(".dh-player-card .dh-player-card__noLogin").css("display" , "none");
                $(".dh-player-card").removeClass("player-card__blur");
                $(".dh-player-card .player-basicinfo #pic").remove();
                initPlayerProfile();
            }, 1600);
        } else if (data.status == 1) {
            if (data.dup == 'id') {
                $("#newPlayerReg__regDone ._nb-spinner").remove();
                $("#newPlayerReg__regDone").prepend(`
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                `);
                $("#newPlayerReg__regDone .wb-tips").text("你使用的 ID 已有玩家使用，请更换一个。");
                
                setTimeout(function() {
                    cleanWindowsBox("#newPlayerReg", "#newPlayerReg__regDone");
                }, 2000);
            } else if (data.dup == 'nick') {
                $("#newPlayerReg__regDone ._nb-spinner").remove();
                $("#newPlayerReg__regDone").prepend(`
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                `);
                $("#newPlayerReg__regDone .wb-tips").text("你使用的昵称已有玩家使用，请更换一个。");
                
                setTimeout(function() {
                    cleanWindowsBox("#newPlayerReg", "#newPlayerReg__regDone");
                }, 2000);
            }
        }
    })
    .catch(error => {
        $("#newPlayerReg__regDone ._nb-spinner").remove();
        $("#newPlayerReg__regDone").prepend(`
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
        `);
        $("#newPlayerReg__regDone .wb-tips").text("前端提交失败，请检查网络设置。");
        
        setTimeout(function() {
            cleanWindowsBox("#newPlayerReg", "#newPlayerReg__regDone");
        }, 2000);
    });
}

/* 玩家绑定 */
async function bindAccount() {
    function hashData(data) {
        const dataString = Object.values(data).join('');
        const hash = CryptoJS.SHA256(dataString).toString();
        return hash;
    }
    
    showWindowsBox("#bindWikiAccount", "#bindWikiAccount__bindDone", `
    <div id="bindWikiAccount__bindDone">
        <div class="_nb-spinner"></div>
        <div class="wb-tips">初始化加载模块</div>
    </div>
    `);
    
    let data = {};
    const loginAccount = $('#authme-account').val();
    const loginPassword = $('#authme-password').val();
    const otherChoice = $('#key-name').val();
    const keyInfo = $('#key-info').val();
    const wikiId = await getWikiId();
    
    // 判断方式
    if (loginAccount != '' ) {
        if (loginPassword != '') {
            $("#bindWikiAccount__bindDone .wb-tips").text("使用账号密码登录");
            
            const bindType = 0;
            
            data = {
              type: bindType,
              wiki_id: wikiId,
              player_id: loginAccount,
              password: CryptoJS.SHA256(loginPassword).toString()
            };
        } else {
            $("#bindWikiAccount__bindDone ._nb-spinner").remove();
            $("#bindWikiAccount__bindDone").prepend(`
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            `);
            $("#bindWikiAccount__bindDone .wb-tips").text("密码不能为空");
            
            setTimeout(function() {
                cleanWindowsBox("#bindWikiAccount", "#bindWikiAccount__bindDone");
            }, 2000);
        }
    } else if (keyInfo != '') {
        const bindType = 1;
        
        if (otherChoice == 'piic')
            searchType = 0;
        else if (otherChoice == 'nick')
            searchType = 1;
        else if (otherChoice == 'id')
            searchType = 2;
            
        data = {
          type: bindType,
          wiki_id: wikiId,
          searchType: searchType,
          search: keyInfo
        };
    }
    
    const hashedData = hashData(data);
    const baseUrl = 'https://api.hydcraft.cn/opreate/BindWikiUser.php';
    
    $("#bindWikiAccount__bindDone .wb-tips").text("提交绑定信息");
    
    fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            key: hashedData
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status == -1) {
            $("#bindWikiAccount__bindDone ._nb-spinner").remove();
            $("#bindWikiAccount__bindDone").prepend(`
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            `);
            $("#bindWikiAccount__bindDone .wb-tips").text("绑定失败");
            
            setTimeout(function() {
                cleanWindowsBox("#bindWikiAccount", "#bindWikiAccount__bindDone");
            }, 2000);
        } else if (data.status == 0) {
            $("#bindWikiAccount__bindDone ._nb-spinner").remove();
            $("#bindWikiAccount__bindDone").prepend(`
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="36px" height="36px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16.17L5.83 13l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            `);
            $("#bindWikiAccount__bindDone .wb-tips").text("绑定成功");
            
            setTimeout(function() {
                $("#bindWikiAccount__bindDone .wb-tips").text("页面将重载");
                $("script[src='https://api.hydcraft.cn/h2wiki/resources/player_profile.js']").remove();
                $(".dh-block").remove();
                
                $(".dh-player-card").css("position" , "unser");
                $(".dh-player-card .dh-player-card__noLogin").css("display" , "none");
                $(".dh-player-card").removeClass("player-card__blur");
                $(".dh-player-card .player-basicinfo #pic").remove();
                initPlayerProfile();
            }, 1600);
        } else if (data.status == 1) {
            $("#bindWikiAccount__bindDone ._nb-spinner").remove();
            $("#bindWikiAccount__bindDone").prepend(`
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
            `);
            $("#bindWikiAccount__bindDone .wb-tips").text("你已绑定账户，不需要重复绑定。");
            
            setTimeout(function() {
                cleanWindowsBox("#bindWikiAccount", "#bindWikiAccount__bindDone");
            }, 2000);
        }
    })
    .catch(error => {
        $("#bindWikiAccount__bindDone ._nb-spinner").remove();
        $("#bindWikiAccount__bindDone").prepend(`
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" width="48px" height="48px">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
            </svg>
        `);
        $("#bindWikiAccount__bindDone .wb-tips").text("前端提交失败，请检查网络设置。" + error);
        
        setTimeout(function() {
            cleanWindowsBox("#bindWikiAccount", "#bindWikiAccount__bindDone");
        }, 2000);
    });
}

/* 条形码异步 */
async function generateBarcode(playerInfo) {
    await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://api.hydcraft.cn/h2wiki/assets/JsBarcode.all.min.js";
        script.onload = resolve;
        document.head.appendChild(script);
    });

    JsBarcode("#barcode", playerInfo.playerlist.piic, {
        format: "CODE128",
        displayValue: true,
        height: 50,
        width: 2,
        background: 'rgba(0,0,0,0)'
    });
}