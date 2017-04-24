     var autoCard = {
         init: function () {
             this.auto();
         },
         auto: function () {
             var listrow = document.querySelectorAll('.listrow');
             var listrowA = listrow[0].querySelectorAll(".ListCellRow a");
             var url = document.querySelectorAll('.listrow .ListCellRow a')[0].href;
             if (listrowA.length) {
                 var url = listrowA[0].href;
             } else {
                 var url = listrow[3].querySelectorAll(".ListCellRow a")[0].href;
             }
             console.log(url)
             location.href = url;
         }
     }
     window.autoCard = autoCard;