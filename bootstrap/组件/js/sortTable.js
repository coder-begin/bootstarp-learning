/**
 * Created by rulersex on 2017/2/9.
 */
var component = (function () {

    function getTableElem() {
        var tableElem = [];
        var table = document.getElementById("score-table");
        var rows = table.children[1].rows;
        var rowLen = rows.length;
        for (var i = 0; i < rowLen; i++) {
            var score = [];
            for (var j = 0; j < rows[i].cells.length; j++) {

                if (rows[i].cells[j + 1]) {
                    score[j] = parseInt(rows[i].cells[j + 1].textContent);
                }

            }
            tableElem.push([rows[i].cells[0].textContent, score]);
        }
        return tableElem;
    }
    function sortTable(event){
        var table = document.getElementById("score-table");
        var tbody = table.children[1];
        var rows = table.children[1].rows;
        var tableElem = getTableElem();
        var temp;
        function delClick(i){
            for (var j = 0; j < tableElem.length; j++) {
                for (var k = j + 1; k < tableElem.length; k++) {
                    if (tableElem[k]) {
                        if (tableElem[j][1][i] > tableElem[k][1][i]) {
                            temp = tableElem[k];
                            tableElem[k] = tableElem[j];
                            tableElem[j] = temp;

                        }
                    }
                }
            }
            tbody.style.display="none";
            for (var l = 0; l < tableElem.length; l++) {
                for (var m = 0; m < tableElem[0][1].length; m++) {
                    rows[l].cells[0].textContent = tableElem[l][0];
                    rows[l].cells[m + 1].textContent = tableElem[l][1][m];
                }
            }
            tbody.style.display="block";

        }
        switch (event.target.id){
            case "yuwen":
                delClick(0);
                break;
            case "shuxue":
                delClick(1);
                break;
            case "yingyu":
                delClick(2);
                break;
            case "zongfeng":
                delClick(3);
                break;
        }

    }
    function initEvent() {

        var allA = document.querySelectorAll("#score-table tr td a");
        for (var i = 0; i < allA.length; i++) {
            allA[i].onclick = sortTable;

        }


    }

    return {
        sortTable: initEvent

    }
})();
component.sortTable();