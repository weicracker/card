$(function () {
    var url = "";
    var schedule = require('node-schedule');
    var timerArr = []; // 时间数组
    var mArr = []; //所有定时器数组
    var successCount = 0;
    var cardTime = $("#cardTime"); // 显示成功次数
    var check = $('#check'); //记住用户名
    if (localStorage.getItem('neiwang') != '') {
        $('#neiwang').attr('checked', 'checked');
    }
    if (localStorage.getItem('userID')) {
        $('#userID').val(localStorage.getItem('userID'));
        $('#check').attr('checked', 'checked');
    }
    $('#startBtn').on('click', function () {
        if ($(this).html() == "开始") {
            //内网选项是否被勾中
            if ($('#neiwang').attr('checked')) {
                url = "http://10.0.0.130/TimeCard/TimeCard_avidm.asp?username=";
                localStorage.setItem('neiwang', "true");
            } else {
                url = "http://oa.bjsasc.com/TimeCard/TimeCard_avidm.asp?username=";
                localStorage.setItem('neiwang', "");
            }
            // ─────────────────────────────────────────────────────────────────
            var userID = $('#userID').val(); //用户名
            var userUrl = url + userID; // 用户url 地址
            var preUrl = "./preload/autocard.js"; // 预加载的js
            var tableTimer = $("table .tabTimer"); // 获取所有用户填写时间的input
            for (var i = 0; i < tableTimer.length; i++) {
                if ($(tableTimer[i]).val()) {
                    var resultTimer = `10 ${$(tableTimer[i]).val().replace(" ","").split(/:|：/)[1]} ${$(tableTimer[i]).val().replace(" ","").split(/:|：/)[0]} * * *`;
                    console.log(resultTimer)
                    timerArr.push(resultTimer); // 将用户填写的时间保存到数组
                }
            }
            for (var j = 0; j < timerArr.length; j++) {
                var m = "dsq" + j
                m = schedule.scheduleJob(timerArr[j], function () {
                    var webView = $('<webview>');
                    var onceFlag = true; //dom ready 里的代码只执行一次
                    $(webView).attr('src', userUrl);
                    $(webView).attr('preload', preUrl);
                    $('body').append(webView);
                    $(webView)[0].addEventListener('dom-ready', () => {
                        // $(webView)[0].openDevTools();
                        var strFn ='autoCard.init()';
                        if (onceFlag) {
                            $(webView)[0].executeJavaScript(strFn, false, function () {
                                onceFlag = false;
                                setTimeout(function () {
                                   webView.remove();
                                }, 5000);
                            });
                        }
                    })
                    successCount++;
                    cardTime.html(successCount);
                });
                mArr.push(m); // 将所有的定时事件存入数组
            }
            // 当开始点击时：所有输入框变为禁用状态
            $('#userID').attr('disabled', 'disabled');
            $("#min").attr('disabled', 'disabled');
            check.attr('disabled', 'disabled');
            $("#neiwang").attr('disabled', 'disabled');
            $(".tabTimer").attr('disabled', 'disabled');
            $('#startBtn').html("取消");
            //记住用户名是否被勾中
            if ($('#check').attr('checked')) {
                localStorage.setItem('userID', $('#userID').val());
            } else {
                localStorage.setItem('userID', "");
            }
        } else {
            // 取消按钮被点击
            //移除禁用状态
            check.removeAttr('disabled');
            $('#userID').removeAttr('disabled');
            $("#min").removeAttr('disabled');
            $(".tabTimer").removeAttr('disabled');
            $("#neiwang").removeAttr('disabled');
            // 取消所有的定时事件
            for (var z = 0; z < mArr.length; z++) {
                mArr[z].cancel();
            }
            // 将定时事件数组及时间数组设为空
            mArr = [];
            timerArr = [];
            cardTime.html("______");
            $('#startBtn').html("开始");
            alert("程序已取消 ");
        }
    });
});