     var autoCard = {
        //  request: require('superagent'),
         init: function () {
             this.auto();
         },
         auto: function () {
             //  var timer = setTimeout(function () {
             //      document.querySelectorAll('.listrow .ListCellRow a')[0].click();
             //      clearTimeout(timer);
             //  }, 50);
            //  console.log(this.request)
             var url = document.querySelectorAll('.listrow .ListCellRow a')[0].href;
             console.log(url)
            //  console.log(this.getCookie('ASPSESSIONIDAQTTSCAB'))
            location.href = url;
            //  this.request.get(url).set({
            //      "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            //      "Accept-Encoding":"gzip, deflate, sdch",
            //      "Accept-Language":"zh-CN,zh;q=0.8,zh-TW;q=0.6,en;q=0.4",
            //      "Host":"oa.bjsasc.com",
            //      "Cookie": "TZ=0;ASPSESSIONIDAQTTSCAB="+this.getCookie('ASPSESSIONIDAQTTSCAB'),
            //      "Connection": "keep-alive",
            //      "Upgrade-Insecure-Requests": 1,
            //       "X-Forwarded-For": "10.0.37.17",
            //      "Proxy-Client-IP":"10.0.37.17",
            //      "WL-Proxy-Client-IP":"10.0.37.17",
            //      "HTTP_CLIENT_IP":"10.0.37.17",
            //      "HTTP_X_FORWARDED_FOR":"10.0.37.17",
            //      "ip":"10.0.37.17",
            //     "REMOTE_ADDR":"10.0.37.17"
            //  }).end(function (err, res) { //"http://10.0.37.11:8585"
            //      if (err) throw err;
            //      console.log(res);
            //  })
         },
         getCookie: function (name) {
             var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
             if (arr = document.cookie.match(reg))
                 return unescape(arr[2]);
             else
                 return null;
         }
     }
     window.autoCard = autoCard;