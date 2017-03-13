$(function () {
    var url = "";
     var delayTime;
     var interVal;
    if (localStorage.getItem('neiwang')!='') {
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
            var mint = $("#min").val();
            var cardTime = $("#cardTime");
            var preUrl = "./preload/autocard.js";
            var timer = 1 * mint; //60 * 
            var t = timer;
            
            delayTime = setTimeout(function () {
                var webView = $('<webview>');
                $(webView).attr('src', userUrl);
                $(webView).attr('preload', preUrl);
                $('body').append(webView);
                $(webView)[0].addEventListener('dom-ready', () => {
                    $(webView)[0].openDevTools();
                    var strFn = 'autoCard.init()';
                    $(webView)[0].executeJavaScript(strFn, false, function () {});
                })
                clearTimeout(delayTime);
            }, timer * 1000);
            interVal = setInterval(function () {
                t--;
                if (t <= 0) {
                    cardTime.html("已完成-");
                    $('#startBtn').html("开始");
                    clearInterval(interVal);
                    $('#userID').removeAttr('disabled');
                    $("#min").removeAttr('disabled');
                    $("#neiwang").removeAttr('disabled');
                } else {
                    cardTime.html(t);
                }
            }, 1000);
            $('#userID').attr('disabled', 'disabled');
            $("#min").attr('disabled', 'disabled');
            $("#neiwang").attr('disabled', 'disabled');
            $('#startBtn').html("取消");
            
            //记住用户名是否被勾中
            if ($('#check').attr('checked')) {
                localStorage.setItem('userID', $('#userID').val());
            } else {
                localStorage.setItem('userID', "");
            }
            alert("程序已就绪，PID = " + delayTime);
        } else {
            $('#userID').removeAttr('disabled');
            $("#min").removeAttr('disabled');
            clearTimeout(delayTime);
            clearInterval(interVal);
            $('#startBtn').html("开始");
            alert("程序已取消 ");
        }
    });

});