// JavaScript source code
var numofseeds;
var turn = true;
var names = true;
var AudioWin = new Audio('sounds/mancwin.wav');
var AudioTie = new Audio('sounds/manctie.wav');
var mancala =
    [
        [4, 4, 4, 4, 4, 4, 0],
        [0, 4, 4, 4, 4, 4, 4],

    ];

function SetPlayersNames() {
    p1name = prompt("Player 1, please enter your name:");
    p2name = prompt("Player 2, please enter your name:");
    if (p1name != "" && p2name != "") {
        names = false;
        document.getElementById("turns").innerHTML = "It's your turn, " + p1name;
    }
    else {
        alert("You must enter your names!");
        SetPlayersNames();
    }

}

function changeBackground(color) { //פונקציה לצבע רקע
    document.body.style.background = color;
}
window.addEventListener("load", function () { changeBackground('lavender'); });

var ImgArray = [];
function BuildBoard() {
    var num = 0;
    //var textImgTag = "";
    var textspecial = "<div class='board'>";
    var text = "";
    var row, col;
    for (row = 0; row < 2; row++) {
        text = text + "<div class='row'>";
        for (col = 0; col < 7; col++) {
            if ((row === 0 && col === 6) || (row === 1 && col === 0)) {
                if (row === 0 && col === 6) {
                    textspecial = textspecial + "<div class='storep1' id='" + num + "' ;' onclick='StartGame(this);'> <div class='label'>" + mancala[row][col] + "</div> <img src = '" + ImgArray[mancala[row][col]] + "'  width = '80%'; height = '50%' /> </div > ";
                }
                else if (row === 1 && col === 0) {
                    textspecial = textspecial + "<div class='storep2' id='" + num + "' ;' onclick='StartGame(this);'> <div class='label'>" + mancala[row][col] + " </div> <img src = '" + ImgArray[mancala[row][col]] + "'  width = '80%'; height = '50%' /> </div > ";
                }
                num++;
            }
            else {
                text = text + "<div class='pit' id='" + num + "' ;' onclick='StartGame(this);'> <div class='label'>" + mancala[row][col] + "</div> <img src = '" + ImgArray[mancala[row][col]] + "'  width = '100%'; height = '100%'; align='top'/>  </div > ";
                num++;
            }


            

        }
        text = text + "</div>";

    }
    text = text + "</div>";
    document.getElementById("Start").innerHTML = textspecial + text;

    if (names == true)
        SetPlayersNames();
}

window.addEventListener("load", function () { LoadPicToArray() });
function LoadPicToArray() {
    var i;
    for (i = 0; i < 46; i++) {
        var img = "img/mancimg/" + i + ".png";
        ImgArray.push(img);
    }

}

function StartGame(currentThis) {
    var CurrentId = currentThis.id;
    var CurrentRow = Math.floor(CurrentId / 7);
    var CurrentCol = CurrentId % 7;
    if (turn && mancala[CurrentRow][CurrentCol] != 0 && CurrentRow == 0 && CurrentCol != 6) {
        TurnPlayer1(CurrentId);
        turn = !turn;
    }
    else if (!turn && mancala[CurrentRow][CurrentCol] != 0 && CurrentRow == 1 && CurrentCol != 0) {
        TurnPlayer2(CurrentId);
        turn = !turn;

    }
    IsEndGame();

}

function TurnPlayer1(CurrentId) {
    document.getElementById("turns").innerHTML = "It's your turn, " + p2name;
    var CurrentRow = Math.floor(CurrentId / 7);
    var CurrentCol = CurrentId % 7;
    var tempseed = mancala[CurrentRow][CurrentCol];
    var numseedend = 0; //משתנה שנועד לעלות באחד כדי לדעת מתי לסיים את ההעברה של האבנים
    mancala[CurrentRow][CurrentCol] = 0;
    while (numseedend != tempseed) {
        while (CurrentCol < 6) { //התקדמות לעבר הקופה
            CurrentCol++;
            mancala[CurrentRow][CurrentCol] += 1;
            numseedend++;
            if (numseedend == tempseed) {
                if (mancala[CurrentRow][CurrentCol] - 1 == 0 && mancala[CurrentRow + 1][CurrentCol+1] != 0 && CurrentCol != 6) {
                    mancala[0][6] += mancala[CurrentRow + 1][CurrentCol+1] + 1;
                    mancala[CurrentRow][CurrentCol] = 0;
                    mancala[CurrentRow + 1][CurrentCol+1] = 0;
                   // בדיקה אם הייתה העברה של גולה למקום ריק. אם כן תתבצע אכילה של הגולות של השחקן השני שנמצאות בצד שלו 'באותה' העמודה
                }
                break;
            }
        }

        if (CurrentCol == 6) {
            if (numseedend == tempseed) {
                turn = !turn;
                alert(p1name + " gets another turn!");
                document.getElementById("turns").innerHTML = "It's your turn, " + p1name;
                break;
            }
            CurrentRow++;

            while (CurrentCol > 0) {//התקדמות נגד הקופה
                mancala[CurrentRow][CurrentCol] += 1;
                CurrentCol--;
                numseedend++;
                if (numseedend == tempseed)
                    break;
            }
        }

        if (CurrentCol == 1) {
            CurrentCol = CurrentCol - 2;
            CurrentRow--;
        }

    }
    
}

function TurnPlayer2(CurrentId) {
    document.getElementById("turns").innerHTML = "It's your turn, " + p1name;
    var CurrentRow = Math.floor(CurrentId / 7);
    var CurrentCol = CurrentId % 7;
    var tempseed = mancala[CurrentRow][CurrentCol];
    mancala[CurrentRow][CurrentCol] = 0;
    var numseedend = 0;
    while (numseedend != tempseed) {
        while (CurrentCol > 0) { //התקדמות לעבר הקופה
            CurrentCol--;
            mancala[CurrentRow][CurrentCol] += 1;
            numseedend++;
            if (numseedend == tempseed) {
                if (mancala[CurrentRow][CurrentCol] - 1 == 0 && mancala[CurrentRow - 1][CurrentCol-1] != 0 && CurrentCol != 0) {
                    mancala[1][0] += mancala[CurrentRow - 1][CurrentCol-1] + 1;
                    mancala[CurrentRow][CurrentCol] = 0;
                    mancala[CurrentRow - 1][CurrentCol-1] = 0;
                   
                }
                break;
            }
        }

        if (CurrentCol == 0) {
            if (numseedend == tempseed) {
                turn = !turn;
                alert(p2name + " gets another turn!");
                document.getElementById("turns").innerHTML = "It's your turn, " + p2name;
                break;
            }
            CurrentRow--;
            while (CurrentCol < 5) {//התקדמות נגד הקופה
                mancala[CurrentRow][CurrentCol] += 1;
                CurrentCol++;
                numseedend++;
                if (numseedend == tempseed)
                    break;
            }
        }

        if (CurrentCol == 5) {
            CurrentCol = CurrentCol + 2;
            CurrentRow++;
        }


    }
}

function IsEndGame() {
    var nonep1 = true;
    var nonep2 = true;
    var i, k;
    for (i = 0; i < 2; i++) {
        for (k = 0; k < 7; k++) {
            if (i == 0 && k != 6 && mancala[i][k] != 0)
                nonep1 = false;
            if (i == 1 && k != 0 && mancala[i][k] != 0)
                nonep2 = false;
        }
    }
    if (nonep1 || nonep2) {
        if (nonep1) {
            for (i = 1; i < 7; i++) {
                mancala[1][0] += mancala[1][i];
                mancala[1][i] = 0;
            }
        }
        else if (nonep2) {
            for (i = 0; i < 6; i++) {
                mancala[0][6] += mancala[0][i];
                mancala[0][i] = 0;
            }
        }

        if (mancala[0][6] > mancala[1][0]) {
            alert("Player 1 won!");
            document.getElementById("turns").innerHTML = "<div class='winner'> Hurray! " + p1name + " won! </div>";
            AudioWin.play();
            document.getElementById("Start").outerHTML = "";
            
        }
        else if (mancala[0][6] == mancala[1][0]) {
            alert("Tie!");
            document.getElementById("turns").innerHTML = "<div class='winner'> Oh! We have a tie! </div>";
            AudioTie.play();
            document.getElementById("Start").outerHTML = "";
        }
        else {
            alert("Player 2 won!");
            document.getElementById("turns").innerHTML = "<div class='winner'> Hurray! " + p2name + " won! </div>";
            AudioWin.play();
            document.getElementById("Start").outerHTML = "";
        }
            


    }

}