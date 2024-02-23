// This is scores.js

// new score is added into the end of the nested array with 11 positions [[Max, 34], [Brooklyn, 32], ... , [Just_Played_Score, 33]]
// sort the array by numerical value
// display content 
// localStorage.setItem("first_name", "3");
// var storedValue = localStorage.getItem("first_name");
// document.getElementById("first_name").textContent = storedValue;

//var element = document.getElementById("exampleElement");
//var integerValue = parseInt(element.textContent, 10);

var leaderboard = new Array(11);
function create_display()
{
leaderboard[0] = [first_name, first_score];
leaderboard[1] = [second_name, second_score];
leaderboard[2] = [third_name, third_score];
leaderboard[3] = [fourth_name, fourth_score];
leaderboard[4] = [fifth_name, fifth_score];
leaderboard[5] = [sixth_name, sixth_score];
leaderboard[6] = [seventh_name, seventh_score];
leaderboard[7] = [eighth_name, eighth_score];
leaderboard[8] = [ninth_name, ninth_score];
leaderboard[9] = [tenth_name, tenth_score];
leaderboard[10] = ["Testing", "50"];
};

update_display()
{
    leaderboard.sort(function(a,b){
        return a[1]-b[1];
    });
    //first_update
    localStorage.setItem("first_name", leaderboard[0][0]);
    var storedValue = localStorage.getItem("first_name");
    document.getElementById("first_name").textContent = storedValue;
    localStorage.setItem("first_name", leaderboard[0][1]);
    var storedValue = localStorage.getItem("first_score");
    document.getElementById("first_name").textContent = storedValue;
    
};

update_display();


console.log(leaderboard[0])

