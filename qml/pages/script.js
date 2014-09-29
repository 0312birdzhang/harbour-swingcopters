.import QtQuick.LocalStorage 2.0 as Sql//数据库连接模块
var tmpi=0;
var signalNum=0;//0-欢迎，1-准备，2-游戏，3-结束
var sorceArr=[0,0,0,0,0,0,0];//当前分数
//结算时动画效果
var tmpSorce=0;//临时分数
var tmpTime=0;//临时计时

var isTap=0;
var g=new Object();//重力环境参数
g.t=30;//到达最高点所需的时间
g.h=80;//最高点距离
var gt=g.t;
var runTime=0;//游戏运行时间
var freshTime=30;//刷新时间
var birdNow=1;//当前小鸟颜色，1-黄，2-蓝，3-红

var pi=Math.PI;
// Offline storage
var db = Sql.LocalStorage.openDatabaseSync("SCHighScore","1.0","Local High Scores",100);
var sorceBest=0;
db.transaction(
    function(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS Scores(score NUMBER)');
        var rs = tx.executeSql('SELECT * FROM Scores ORDER BY score desc LIMIT 1');
        for (var i = 0; i < rs.rows.length; i++) {
            sorceBest=rs.rows.item(i).score;
        }
    }
);
var kaObjs;

var guanArr=[120,-180,-480,-780];//管y位置

function init(){

    kaObjs=[ka,ka1,ka2,ka3];
}


function initData(){

    ka.y=120;ka1.y=-180;ka2.y=-480;ka3.y=-780;//栅栏重定位
    ka.x=36*Math.floor(Math.random()*5)-90;//-90+90
    ka1.x=36*Math.floor(Math.random()*5)-90;
    ka2.x=36*Math.floor(Math.random()*5)-90;
    ka3.x=36*Math.floor(Math.random()*5)-90;

    ka.visible=ka1.visible=ka2.visible=ka3.visible=true;
    bird.x0=205;
    bird.x=bird.x0;
    bird.y=550;
    bird.visible=true;
    bg_3.y=536;
    bg_4.y=606;

    signalNum=1;//状态更换
    runTime=0;//时间重置
    sorcenew.visible=false;//新纪录图标重置隐藏
    sorceNow1.visible=false;
    sorceNow2.visible=false;
    sorceNow3.visible=true;
    sorceArr[0]=0;//分数重置


//    birdNow=Math.floor(Math.random()*100)%3+1;//重置小鸟颜色
//    if(Math.floor(Math.random()*100)%2){//重置背景颜色
//        bg_1.source="img/bg_day.png";
//    }else{
//        bg_1.source="img/bg_night.png";
//    }

}
function sicle(){
    tmpi=(tmpi+1)%10000;//防止溢出导致程序混乱

    if(tmpi%2==0){//分频,1/2速度下
        if(signalNum==0){//欢迎界面下
            logo.y+=logo.dir;
            if(logo.y==100) {logo.dir=-1;}
            if(logo.y==60)  {logo.dir=1;}
        }
        if(signalNum<=1){//游戏开始前的摆锤动画效果
            leftbai.rotation=20*Math.sin(pi*tmpi/80)
            rightbai.rotation=20*Math.sin(pi*tmpi/80)
        }else{//游戏开始后的摆锤动画效果
            leftbai.rotation=leftbai1.rotation=leftbai2.rotation=leftbai3.rotation=20*Math.sin(pi*tmpi/80)
            rightbai.rotation=rightbai1.rotation=rightbai2.rotation=rightbai3.rotation=20*Math.sin(pi*tmpi/80)
        }
    }

    if(tmpi%8==0){//分频,1/8速度下
        if(signalNum==0){//欢迎界面下
            logo.source="img/ready"+tmpi/8%4+".png";
        }
        if(signalNum==2){//游戏状态下
            bird.source="img/r0"+bird.dir+""+(tmpi/8%3)+".png";
        }
    }
    if(signalNum==2){//游戏状态下
        runTime+=freshTime;

        gt++;
        //刷新界面位置
        if(runTime>30*freshTime){
            if(tmpi%8==0){//分频,1/2速度下
                luoxuanjiang.source="img/j"+(tmpi/8%4)+".png"
            }
        }
        if(runTime==60*freshTime){
            gt=1;
        }
        if(runTime>60*freshTime){
            if(bird.dir==1){
                bird.x=bird.x0+gt*gt*gt/120;
            }else{
                bird.x=bird.x0-gt*gt*gt/120;
            }
            if(bird.y>260){
                bird.y-=6;
            }else{
                if(bg_3.y<860){
                    bg_3.y+=6;
                    bg_4.y+=6;
                }
                for(var tmpj=0,tmpl=kaObjs.length;tmpj<tmpl;tmpj++){
                    kaObjs[tmpj].y+=6;
                    if(kaObjs[tmpj].y>900){
                        kaObjs[tmpj].y-=1200;
                        kaObjs[tmpj].x=36*Math.floor(Math.random()*5)-90;
                    }
                }
            }
        }

        //显示当前分数,并调整居中
        if(sorceArr[0]==10){
            sorceNow2.visible=true;
            sorceNow2.x=21;
            sorceNow3.x=65;
        }else if(sorceArr[0]==100){
            sorceNow1.visible=true;
            sorceNow1.x=0;
            sorceNow2.x=44;
            sorceNow3.x=88;
        }else if(sorceArr[0]<10){
            sorceNow3.x=44;
        }
        sorceArr[1]=Math.floor(sorceArr[0]/100);
        sorceArr[2]=Math.floor(sorceArr[0]%100/10);
        sorceArr[3]=Math.floor(sorceArr[0]%10);
        sorceNow1.source="img/3"+sorceArr[1]+".png";
        sorceNow2.source="img/3"+sorceArr[2]+".png";
        sorceNow3.source="img/3"+sorceArr[3]+".png";
    }

    runGame();
    if(signalNum==2){//游戏状态下
        checkDie();
    }

    if(signalNum==3){//结算状态下
        tmpTime++;
        if(tmpTime%5==0 && tmpSorce<sorceArr[0]){
            tmpSorce++;
            showSorce(tmpSorce);
        }
    }
}

function enterGame(){
    logo.visible=false;
    start_btn.visible=rank_btn.visible=back_btn.visible=false;
    div.isPlay=false;
    div.color="#ff000000";
    div.visible=true;//过幕
    ka.y=120;
    overDiv.visible=false;
    readyDiv.visible=true;
    div.isPlay=true;
    div.color="#00000000";

    signalNum=1;
    initData();//数据初始化
}
function startGame(){
    readyDiv.visible=false;
    overDiv.visible=false;
    gameDiv.visible=true;
    sorceNow.visible=true;
    signalNum=2;//状态更换
    runTime=0;//时间重置
    sorceArr[0]=0;//分数重置
    gt=5;
}
function restartGame(){//重新开始
    overDiv.visible=false;
    gameDiv.visible=false;
    readyDiv.visible=true;
    initData();//数据初始化
}
function runGame(){
    if((runTime-60*freshTime-75*freshTime)>=0&&(runTime-60*freshTime-75*freshTime)%(50*freshTime)==0){
        sorceArr[0]++;//得分增加
    }
}
function dieGame(){//死亡时执行的函数
    sorceNow.visible=false;
    gameDiv.visible=false;
    start_btn.visible=rank_btn.visible=back_btn.visible=true;

    if(sorceArr[0]>sorceBest){
        saveHighScore();
        sorcenew.visible=true;
        sorceBest=sorceArr[0];
    }
    tmpSorce=0;
    showSorce(tmpSorce);//显示得分

    showBestSorce();//显示最好分数
    overDiv.visible=true;//显示死亡图层
    signalNum=3;
    runTime=0;
}
function checkDie(){//检测死亡
    if(runTime>0 && (bird.x<0 || bird.x>480-bird.width)){
        dieGame();
    }
    for(var tmpj=0,tmpl=kaObjs.length;tmpj<tmpl;tmpj++){
        if(bird.y+bird.height>=kaObjs[tmpj].y && bird.y<=kaObjs[tmpj].y+37){
            if(bird.x<=kaObjs[tmpj].x+120 || bird.x+bird.width>=kaObjs[tmpj].x+360){
                dieGame();
            }
        }
        if(bird.y+bird.height>=kaObjs[tmpj].y+90 && bird.y<=kaObjs[tmpj].y+150){
            if(bird.x>=kaObjs[tmpj].x+51+Math.sin(pi*kaObjs[tmpj].rotation/180) && bird.x+bird.width<=kaObjs[tmpj].x+121+Math.sin(pi*kaObjs[tmpj].rotation/180)){
                dieGame();
            }
            if(bird.x>=kaObjs[tmpj].x+361+Math.sin(pi*kaObjs[tmpj].rotation/180) && bird.x+bird.width<=kaObjs[tmpj].x+431+Math.sin(pi*kaObjs[tmpj].rotation/180)){
                dieGame();
            }
        }
    }
}

function tap(){
    bird.dir=Math.abs(bird.dir-1)
    gt=5;//重置时间
    bird.x0=bird.x;//重置起点
}

function rank(){
    myDia.show(""+
        "    Best Score : "+sorceBest+"\n\n"+
        "    Swing Copters for Jolla\n\n"+
        "    Author:ChanXi\n\n"+
        "    Modified:BirdZhang"

               );
}
function saveHighScore(){
    var dataStr = "INSERT INTO Scores VALUES(?)";
    var data = sorceArr[0];
    db.transaction(
        function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Scores(score NUMBER)');
            tx.executeSql(dataStr, data);
        }
    );
}

function back(){
    signalNum=0;
    start_btn.visible=rank_btn.visible=true;
    back_btn.visible=false;

    logo.visible=true;
    div.isPlay=false;
    div.color="#ff000000";
    div.visible=true;//过幕
    ka.y=180;ka1.y=-180;ka2.y=-480;ka3.y=-780;
    ka.x=0;

    bg_3.y=536;
    bg_4.y=606;

    bird.visible=false;

    overDiv.visible=false;
    readyDiv.visible=false;

    div.isPlay=true;
    div.color="#00000000";
}

function showSorce(msorce){//显示最终分数
    var tmpSorceArr=new Array();
    tmpSorceArr[0]=sorceArr[1]=Math.floor(msorce/100);
    tmpSorceArr[1]=Math.floor(msorce%100/10);
    tmpSorceArr[2]=Math.floor(msorce%10);

    sorce1.visible=false;
    sorce2.visible=false;
    sorce3.visible=true;
    if(msorce>=10){sorce2.visible=true;}
    if(msorce>=100){sorce1.visible=true;}
    sorce1.source="img/2"+tmpSorceArr[0]+".png"
    sorce2.source="img/2"+tmpSorceArr[1]+".png"
    sorce3.source="img/2"+tmpSorceArr[2]+".png"
}

function showBestSorce(){//显示最好分数
    sorceArr[4]=Math.floor(sorceBest/100);
    sorceArr[5]=Math.floor(sorceBest%100/10);
    sorceArr[6]=Math.floor(sorceBest%10);
    sorcebest1.visible=false;
    sorcebest2.visible=false;
    sorcebest3.visible=true;
    if(sorceBest>=10){sorcebest2.visible=true;}
    if(sorceBest>=100){sorcebest1.visible=true;}
    sorcebest1.source="img/2"+sorceArr[4]+".png"
    sorcebest2.source="img/2"+sorceArr[5]+".png"
    sorcebest3.source="img/2"+sorceArr[6]+".png"
    if(sorceArr[0]>0){//奖牌
        media.source="";
        if(sorceArr[0]>=10){media.source="img/me_1.png";}
        if(sorceArr[0]>=20){media.source="img/me_2.png";}
        if(sorceArr[0]>=30){media.source="img/me_3.png";}
        if(sorceArr[0]>=40){media.source="img/me_4.png";}
    }
}

