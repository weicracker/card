    var remote, birdge;
    var autoCard = {
        init: function () {
            remote = require("electron").remote;
            birdge = remote.require("../out/event");
            this.auto();
        },
        auto: function () {
            var listrow = document.querySelectorAll('.listrow');
            var listrowA = listrow[0].querySelectorAll(".ListCellRow a");
            var url = listrowA.length ? listrowA[0].href : (listrow[3].querySelectorAll(".ListCellRow a").length ? listrow[3].querySelectorAll(".ListCellRow a")[0].href : ""); //0上午上班，3下午下班
            var curContent = listrowA.length ? listrow[0].querySelectorAll(".ListCellRow")[0].innerHTML : (listrow[3].querySelectorAll(".ListCellRow a").length ? listrow[3].querySelectorAll(".ListCellRow")[0].innerHTML : "");
            var time = this.curentTime()
            if (url) {
                // 为模拟人工打卡，每次打卡时间误差调整为15分钟内
                setTimeout(() => {
                    location.href = url;
                    var logMes = {
                        url: url,
                        time: time,
                        curContent: curContent
                    }
                    try {
                        birdge.emit("logmessage", logMes);
                    } catch (err) {
                        console.log(err)
                    }
                }, parseInt(Math.random() * 15*60*1000));
            }
        },
        curentTime: function () {
            var now = new Date();

            var year = now.getFullYear(); //年  
            var month = now.getMonth() + 1; //月  
            var day = now.getDate(); //日  

            var hh = now.getHours(); //时  
            var mm = now.getMinutes(); //分  
            var ss = now.getSeconds(); //秒  

            var clock = year + "-";

            if (month < 10)
                clock += "0";

            clock += month + "-";

            if (day < 10)
                clock += "0";

            clock += day + " ";

            if (hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm + ":";

            if (ss < 10) clock += '0';
            clock += ss;
            return (clock);
        }
    }
    window.autoCard = autoCard;
    //  setTimeout(function () {
    //      autoCard.auto();
    //  }, 2000)