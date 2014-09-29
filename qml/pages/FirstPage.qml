/*
  Copyright (C) 2013 Jolla Ltd.
  Contact: Thomas Perl <thomas.perl@jollamobile.com>
  All rights reserved.

  You may use this file under the terms of BSD license as follows:

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Jolla Ltd nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR CONTRIBUTORS BE LIABLE FOR
  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import QtQuick 2.0
import Sailfish.Silica 1.0


import "qml"
import "script.js" as Sd



Page {
    Item{
        id:screen;
        anchors.fill:parent;
    }
    id:mainPage
    width: 480;
    height:854;
    property int tim:0;
    transformOrigin:Item.TopLeft;
    scale:screen.width/480;
    Rectangle {
        id: rectangle1
        anchors.fill: parent;
        width: 480
        //背景颜色
        Image {id:bg_1;z:10;source:"img/bg0.png";}
        //背景云彩
        Image {id:bg_2;z:10;x:58;y:108;source:"img/yun0.png";}
        //背景树木
        Image {id:bg_3;z:11;x:0;y:536;source:"img/bg_bottom0.png"}
        //底部前景
        Image {id:bg_4;z:20;x:0;y:606;source:"img/bg_bottom1.png"}

        Item {id: ka;
            x:0;y:180;z:12;
            Image {id:leftbai;x:51;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {id:rightbai;x:361;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {x:360;y:0;source:"img/lan.png";}
            Image {x:-333;y:0;source:"img/lan.png";}
        }
        Item {id: ka1;
            x:0;y:-180;z:12;
            Image {id:leftbai1;x:51;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {id:rightbai1;x:361;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {x:360;y:0;source:"img/lan.png";}
            Image {x:-333;y:0;source:"img/lan.png";}
        }
        Item {id: ka2;
            x:0;y:-480;z:12;
            Image {id:leftbai2;x:51;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {id:rightbai2;x:361;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {x:360;y:0;source:"img/lan.png";}
            Image {x:-333;y:0;source:"img/lan.png";}
        }
        Item {id: ka3;
            x:0;y:-780;z:12;
            Image {id:leftbai3;x:51;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {id:rightbai3;x:361;y:40;source:"img/chui.png";transformOrigin:Item.Top;}
            Image {x:360;y:0;source:"img/lan.png";}
            Image {x:-333;y:0;source:"img/lan.png";}
        }
        Item{
            property int dir: 1;
            property int x0: 205;
            property string source: "img/r010.png"
            id: bird;//游戏中的小鸟
            x:205;y:550;z:13;
            width:70;height:73;
            Image {id: luoxuanjiang;x:-3;source: "img/j3.png";}
            Image {x:10;y: 20;source: bird.source;}
        }

        //游戏logo
        Image {id: logo;
            property int y0: 80;
            property int dir: 1;
            x: 240-logo.width/2;y: 80;z:12;
            source: "img/ready0.png"
        }


        Rectangle{//预备阶段界面
            visible: false;
            id:readyDiv;
            z:13;
            color: "#00ffffff";
            anchors.fill: parent;
            Image {id: getready;x: 240-getready.width/2;y: 108;source: "img/getaready.png";}
            Image {id: study;x: 240-study.width/2;y: 260;source: "img/study.png";}
            MouseArea{anchors.fill: parent;onPressed: {Sd.startGame();}}
        }

        Rectangle{//游戏界面
            visible: false;
            id:gameDiv;
            z:13;
            color: "#00ffffff";
            anchors.fill: parent;
            Item {id: sorceNow;//当前分数
                z:13;width: 130;x: 240-sorceNow.width/2;y: 60;
                Image {id: sorceNow1;x:44;source: "img/30.png";}
                Image {id: sorceNow2;x:44;source: "img/30.png";}
                Image {id: sorceNow3;x:44;source: "img/30.png";}
            }
            MouseArea{anchors.fill: parent;onPressed: {Sd.tap();}}
        }

        Rectangle{//游戏结束界面
            visible: false;
            id:overDiv;
            z:13
            color: "#00ffffff";
            anchors.fill: parent;
            Image {id: gameover;
                x: 240-gameover.width/2;
                y: 100;
                source: "img/gameover.png"
            }
            Image {id: overbg;
                //visible: false;测试
                x: 43;
                y: 200;
                source: "img/me_bg.png"
            }
            Image {id: media;
                x: 90;
                y: 275;
                source: "img/me_1.png"
            }
            //本局分数
            Item {id: sorce;
                z:13;width: 79;
                x: 310; y: 260;
                Image {id: sorce1;x: 0;source: "img/20.png";}
                Image {id: sorce2;x:27;source: "img/20.png";}
                Image {id: sorce3;x:54;source: "img/20.png";}
            }
            //最佳分数
            Item {id: sorcebest;
                z:13;width: 79;
                x: 310; y: 330;
                Image {id: sorcebest1;x: 0;source: "img/20.png";}
                Image {id: sorcebest2;x:27;source: "img/20.png";}
                Image {id: sorcebest3;x:54;source: "img/20.png";}
            }
            //新纪录
            Image {id: sorcenew;
                visible: false;
                x: 250;y: 330;
                source: "img/new.png"
            }
        }

        //功能按钮
        Image {id: start_btn;
            visible: true;
            x: 48;y: 416;z: 30;source: "img/btn_start.png";
            MouseArea{anchors.fill: parent;onClicked: {Sd.enterGame();}}
        }
        Image {id: rank_btn;
            visible: true;
            x: 258;y: 416;z: 30;source: "img/btn_rank.png";
            MouseArea{anchors.fill: parent;onClicked: {Sd.rank();}}
        }
        Image {id: back_btn;
            visible: false;
            x: 0;y: 17;z: 30;source: "img/btn_back.png";
            MouseArea{anchors.fill: parent;onClicked: {Sd.back();}}
        }

        Rectangle{id:div;//过幕-幕布
            property bool isPlay: false;
            visible: div.color=="#00000000";
            z:50;
            color: "#ff000000";
            anchors.fill: parent;
            Behavior on y {
                enabled: div.isPlay
                NumberAnimation { duration: 100 }
            }
            Behavior on color {
                enabled: div.isPlay
                ColorAnimation { duration: 2000}
            }
        }
    }

    //“关于”弹窗
    Dialog{
        id:myDia
        anchors.centerIn: parent
        //color:"white"
        z: 22;
    }

    //定时器
    Timer{
        id:mTimer
        interval: 20;
        running: true;
        repeat: true
        onTriggered: {
            Sd.sicle();
        }
    }
    Component.onCompleted: {
        Sd.init();
    }
}
