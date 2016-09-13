
    //获取canvas对象
    var c = document.getElementById("canvas-club");
    //获取绘画环境
    var ctx = c.getContext("2d");
    //设置画布大小
    var w = c.width = window.innerWidth;
    var h = c.height = window.innerHeight;
    // 设置渐变色
    var clearColor = 'rgba(0, 0, 0, .1)';
    //设置雨滴初始值
    var max = 30;
    //定义数组存放雨水
    var drops = [];


    //定义随机函数
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    //定义构造函数
    function O() {};
    //设置函数原型
    O.prototype = {
        //设置变量
        init: function() {
            this.x = random(0, w); //出现坐标x
            this.y = 0;//出现坐标y
            this.color = 'hsl(180, 100%, 50%)';//颜色
            this.w = 2;//椭圆的初始宽度
            this.h = 1;//椭圆的初始高度
            this.vy = random(4, 5);//雨滴速度
            this.vw = 3;//椭圆的扩散速度
            this.vh = 1;//椭圆的扩散速度
            this.size = 2; //雨滴宽度
            this.hit = random(h * .8, h * .9);//雨滴下落最大宽度
            this.a = 1;//透明度
            this.va = .96;//透明度的渐变度
        },
        draw: function() {
            //如果雨滴的坐标达到y，画圆圈。
            if (this.y > this.hit) {
                ctx.beginPath();//开始绘画
                ctx.moveTo(this.x, this.y - this.h / 2);//绘画起点
                //贝赛尔曲线画上半圆，下半圆（我看不懂）
                ctx.bezierCurveTo(
                    this.x + this.w / 2, this.y - this.h / 2,
                    this.x + this.w / 2, this.y + this.h / 2,
                    this.x, this.y + this.h / 2);

                ctx.bezierCurveTo(
                    this.x - this.w / 2, this.y + this.h / 2,
                    this.x - this.w / 2, this.y - this.h / 2,
                    this.x, this.y - this.h / 2);
                //上色
                ctx.strokeStyle = 'hsla(180, 100%, 50%, '+this.a+')';
                ctx.stroke();
                //关闭路径
                ctx.closePath();

            } else {
                //雨滴画矩形
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.size, this.size * 5);
            }
            this.update();
        },
        //更新方法
        update: function() {

            if(this.y < this.hit){ //雨滴下落过程中，改变y的坐标
                this.y += this.vy;
            } else {
                if(this.a > .03){ //雨滴下落之后，透明度大于0.03时
                    this.w += this.vw; //改变椭圆的宽度
                    this.h += this.vh; //改变椭圆的高度
                    if(this.w > 100){ //椭圆的宽度达到100时
                        this.a *= this.va; //透明度变浅，直到0.03
                        this.vw *= .98;//椭圆宽度速度变化
                        this.vh *= .98;//椭圆高度速度变化
                    }
                } else { //雨滴下落之后，透明度小于0.03时，恢复初始值
                    this.init();
                }
            }

        }
    }
    // 窗口改变
    function resize(){
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
    }
    //初始化数组，不同时间（j*200）存放入数组中
    function setup(){
        for(var i = 0; i < max; i++){
            (function(j){
                setTimeout(function(){
                    var o = new O();
                    o.init();
                    drops.push(o);
                }, j * 200)
            }(i));
        }
    }

    //调用数组中的原型方法
    function anim() {
        ctx.fillStyle = clearColor;
        ctx.fillRect(0,0,w,h);
        for(var i in drops){
            drops[i].draw();
        }
        requestAnimationFrame(anim);
    }


    window.addEventListener("load", resize);

    setup();
    anim();