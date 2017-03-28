$(function () {
    var url = "";
    var delayTime;
    var schedule = require('node-schedule');
    var interVal;
    var timerArr = [];
    var mArr = [];
    var successCount = 0;
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
            var userID = $('#userID').val();
            var check = $('#check');
            var userUrl = url + userID;
            var cardTime = $("#cardTime");
            var preUrl = "./preload/autocard.js";
            var tableTimer = $("table .tabTimer");
            for (var i = 0; i < tableTimer.length; i++) {
                if ($(tableTimer[i]).val()) {
                    timerArr.push($(tableTimer[i]).val());
                }
            }
            for (var j = 0; j < timerArr.length; j++) {
                var m = "dsq" + j
                m = schedule.scheduleJob(timerArr[j], function () {
                    var webView = $('<webview>');
                    $(webView).attr('src', userUrl);
                    $(webView).attr('preload', preUrl);
                    $('body').append(webView);
                    $(webView)[0].addEventListener('dom-ready', () => {
                        // $(webView)[0].openDevTools();
                        var strFn = 'autoCard.init()';
                        $(webView)[0].executeJavaScript(strFn, false, function () {});
                        successCount++;
                        cardTime.html(successCount);
                    })
                });
                mArr.push(m);
            }
            $('#userID').attr('disabled', 'disabled');
            $("#min").attr('disabled', 'disabled');
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
            $('#userID').removeAttr('disabled');
            $("#min").removeAttr('disabled');
            $(".tabTimer").removeAttr('disabled');
            $("#neiwang").removeAttr('disabled');
            for (var z = 0; z < mArr.length; z++) {
                mArr[z].cancel();
            }
            mArr=[];
            timerArr = [];
            cardTime.html("______");
            $('#startBtn').html("开始");
            alert("程序已取消 ");
        }
    });
});