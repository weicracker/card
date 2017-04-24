     var autoCard = {
         init: function () {
             this.auto();
         },
         auto: function () {
             var listrow = document.querySelectorAll('.listrow');
             var listrowA = listrow[0].querySelectorAll(".ListCellRow a");
             var url = listrowA.length ? listrowA[0].href : (listrow[5].querySelectorAll(".ListCellRow a").length ? listrow[5].querySelectorAll(".ListCellRow a")[0].href : "");
             if (url) {
                 location.href = url;
             }
         }
     }
     window.autoCard = autoCard;