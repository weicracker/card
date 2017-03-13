     var autoCard = {
         init: function () {
             this.auto();
         },
         auto: function () {
             var url = document.querySelectorAll('.listrow .ListCellRow a')[0].href;
             location.href = url;
         }
     }
     window.autoCard = autoCard;