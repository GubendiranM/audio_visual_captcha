/**
 * Created with JetBrains WebStorm.
 * User: EMDnew
 * Date: 19/04/17
 * Time: 13:05
 * To change this template use File | Settings | File Templates.
 */
var audioObj = [
    {"id": "1","question": "how much of two plus two","answer": "4"},
    {"id": "2","question": "how much of twice of eight","answer": "16"},
    {"id": "3","question": "how much of thrice of three","answer": "9"},
    {"id": "4","question": "how much of five plus five","answer": "10"},
    {"id": "5","question": "how much of ninety nine plus one","answer": "100"},
    {"id": "6","question": "how much of fifty plus fifty","answer": "100"},
    {"id": "7","question": "how much of ninety minus 1","answer": "89"},
    {"id": "8","question": "how much of twenty plus twenty","answer": "40"},
    {"id": "9","question": "how much of forty eight plus two","answer": "50"},
    {"id": "10","question": "how much of one plus fifty","answer": "51"},
    {"id": "11","question": "how much of two minu two","answer": "0"},
    {"id": "12","question": "how much of thrice of eight","answer": "24"},
    {"id": "13","question": "how much of twice of three","answer": "6"},
    {"id": "14","question": "how much of five minus two","answer": "3"},
    {"id": "15","question": "how much of ninety nine minus one","answer": "98"},
    {"id": "16","question": "how much of fifty plus ten","answer": "600"},
    {"id": "17","question": "how much of hundred minus 1","answer": "99"},
    {"id": "18","question": "how much of twenty minus ten","answer": "10"},
    {"id": "19","question": "how much of ninety eight plus two","answer": "100"},
    {"id": "20","question": "how much of nine plus one","answer": "10"}
];

var visualObj = [
    {"id": "1","file_name": "Laptop.png","answer": "Laptop"},
    {"id": "2","file_name": "Bar_Chart.png","answer": "Bar Chart"},
    {"id": "3","file_name": "Computer_Mouse.png","answer": "Computer Mouse"},
    {"id": "4","file_name": "Man_With_Pet.png","answer": "Man With Pet"},
    {"id": "5","file_name": "Man_With_Suitcase.png","answer": "Man With Suitcase"},
    {"id": "6","file_name": "Woman_With_Kids.png","answer": "Woman With Kids"},
    {"id": "7","file_name": "battery.png","answer": "Battery"},
    {"id": "8","file_name": "bell.png","answer": "bell"},
    {"id": "9","file_name": "calender.png","answer": "calender"},
    {"id": "10","file_name": "clock.png","answer": "clock"},
    {"id": "11","file_name": "flag.png","answer": "flag"},
    {"id": "12","file_name": "home.png","answer": "home"},
    {"id": "13","file_name": "hourglass.png","answer": "hour glass"},
    {"id": "14","file_name": "idea.png","answer": "bulb"},
    {"id": "15","file_name": "key.png","answer": "key"},
    {"id": "16","file_name": "loading.png","answer": "loading"},
    {"id": "17","file_name": "open-book.png","answer": "open book"},
    {"id": "18","file_name": "photo-camera.png","answer": "photo camera"},
    {"id": "19","file_name": "target.png","answer": "target"},
    {"id": "20","file_name": "video-camera.png","answer": "video-camera"},
    {"id": "21","file_name": "eye.png","answer": "eye"}];

var defaultOption = true; // true means visuals and false means audio

var audioQuestion;
var visualQuestion;
var randomSelectedVisuals = new Array();

var preImageId=''; // set selected image bg color and remove previous one
var userVisualAns ='';


// function to select 5  visual images Randomly
function getRandomVisualObjects(obj){

    var randomVisuals = new Array();
    tempVisual = obj;
    var k;
    var tempArr = [];
    for(var i=0; (i<5 & obj.length>0);i++){
        k=Math.floor(Math.random() * obj.length);
        console.log('randomly selected index is : '+k);
        if(!checkExistSameVisual(tempArr, k)){
            tempArr.push(k);
            randomVisuals[i] = obj[k];
        }else{
            i--;
        }
    }
    return randomVisuals;
}

// true means already selected
function checkExistSameVisual(arr, ele) {
    return (arr.indexOf(ele) != -1);
}

function verifyCaptcha(){
    var _flag = false;
    if(defaultOption == true){
        if(userVisualAns == visualQuestion.answer){
            _flag = true;
            alert('visual succ : '+userVisualAns +' '+visualQuestion.answer);
        }
        else{
            alert('visual fail  : '+userVisualAns +' '+visualQuestion.answer);
        }
    }else{
        var input = $('#audio_ans').val();
        if(input == audioQuestion.answer){
            alert('visual succ : '+input +' '+audioQuestion.answer);
            _flag = true;
        }
        else{
            alert('visual fail  : '+input +' '+audioQuestion.answer);
        }
    }
    return _flag;
}

function getRandomAudio(){
    randomAudio = audioObj[Math.floor(Math.random() * audioObj.length)];
    setAudioCaptcha();
}

function getRandomVisual(){
    randomAudio = visualObj[Math.floor(Math.random() * visualObj.length)];
    setVisualCaptcha();
}


function setAudioCaptcha(){
    $('#audio_btn').css({"background-color": "white", "border":"0px solid black"});
    $('#visual_btn').css({"background-color": "#ccc", "border":"1px solid black"});
    audioQuestion = audioObj[Math.floor(Math.random() * audioObj.length)];
    defaultOption = false;
    var audioContent = '<center><table style="width:100%;"><tr><td width="80%">Type Answer for the Question </td><td width="20%"><image  src ="captcha/images/refresh.png" width = "50" height = "30" onclick = "setAudioCaptcha();"></image></td></tr> <tr><td colspan="2"><center><input class = "input_style" placeholder="type your answer here  " type="text" class ="input_cls" id="audio_ans" ></input></center></td></tr> </table></center>'
    $('#question_td').empty();
    $('#question_td').append(audioContent);
    responsiveVoice.speak(audioQuestion.question);

}

function setVisualCaptcha(){
    $('#audio_btn').css({"background-color": "#ccc", "border":"1px solid black"});
    $('#visual_btn').css({"background-color": "white", "border":"0px solid black"});
    randomSelectedVisuals = getRandomVisualObjects(visualObj);
    visualQuestion = randomSelectedVisuals[Math.floor(Math.random() * randomSelectedVisuals.length)];
    defaultOption = true;
    var visualContents = getVisualImages(randomSelectedVisuals, visualQuestion);
    $('#question_td').empty();
    $('#question_td').append(visualContents);
}

function getVisualImages(tempObj, selectedObj){
    var visuals = '<center><table style="width:90%;border-collapse: collapse;"><tr><td colspan="4" style="width:80%">Select the <b>'+selectedObj.answer+'</b></td><td style="width:20%"><img src="captcha/images/refresh.png" alt="Refresh" width="50" height="30" onclick="setVisualCaptcha()"/></td></tr><tr>';
    for(var j=0;j<tempObj.length;j++){
        visuals= visuals+'<td style="width:20%;border-style: dashed;  border-color: grey;   border-width: 2px;"><img id="img_'+j+'" src="captcha/visual/'+tempObj[j].file_name+'" alt="Refresh" width="50"" height="50" onclick="setSelectedVisual(\''+tempObj[j].answer+'\',this.id)"></td>';
    }
    visuals=visuals+'</tr></table></center>';
    return visuals;
}


function setSelectedVisual(val, clicked_id){
    userVisualAns = val;
    setUnselectedVisual(preImageId);
    preImageId = clicked_id;
    console.log('clicek ID: '+clicked_id)
    $('#'+clicked_id).css({"background-color": "#ccc", "border":"1px solid black"});
}

function setUnselectedVisual(preImageId){
    if( preImageId ) {
        $('#'+preImageId).css({"background-color": "white", "border":"0px solid black"});
    }
}

function initCaptcha(){
    var captcha_div = $('<div></div>',{id: "captcha_body",class : "captcha_body"});
    $('#captcha_div').append(captcha_div);
    var body_tbl = $('<table></table>',{class: "body_tbl"});
    captcha_div.append(body_tbl);
    var option_tr = $('<tr><td style="width: 50%;"><button class = "option_btn" id="audio_btn" onclick = "setAudioCaptcha();">Audio</button></td><td style="width: 50%;"><button class = "option_btn" id="visual_btn" onclick = "setVisualCaptcha();" >Visual</button></td></tr>');
    body_tbl.append(option_tr);
    var question_tr = $('<tr id="question_tr"><td id="question_td" colspan="2"></td></tr>');
    body_tbl.append(question_tr);
    var submit_tr = $('<tr id="submit_tr"><td colspan="2"><button class = "option_btn" id="audio_btn" onclick="verifyCaptcha();" >submit</button></td></tr>');
    body_tbl.append(submit_tr);
    $('#captcha_body').append(body_tbl);
    setVisualCaptcha();
}








