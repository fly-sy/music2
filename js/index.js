function $(id){
    return document.getElementById(id);
}
// 获取audio DOM
var audioDom = $("audio");
window.onload=function(){
    lrc.init($("lrccontext").value);
    //监听当前的播放时间
    audioDom.ontimeupdate =function(){
        var t =parseInt(this.currentTime);
        lrc.jump(t);
    };
}

var lrc ={
    regex_trim: /^\s+|\s+$/,//正则，去掉首尾空格
    // 解析歌词
    init:function(lrctext){
        var arr = lrctext.split("\n");
        var html="";
        for(var i =0;i<arr.length;i++){
            var item =arr[i].replace(this.regex_trim,"");//每一句分割出来，空格变为空
            var ms= item.split("]");
            var mt = ms[0].replace("[","");
            var m =mt.split(":");
            var num = parseInt(m[0]*60+m[1]*1);
            var lrc=ms[1];
            if (lrc) {
                html+="<li id='t_"+num+"'>"+lrc+"</li>"
            };
        };
        $("lrc_list").innerHTML +=html;
    },
    // 歌词跳动
    jump:function(duration){
        // console.log(duration);
        //获取当前监听到的li
        var dom =$("t_"+duration);
        var lrcbox = $("lrc_list");
        if(dom){
            var arr = this.siblings(dom);
            for(var i=0 ;i<arr.length;i++){
                arr[i].className="";
            }
            dom.className="hover";
            var index = this.indexof(dom)-4;
            lrcbox.style.marginTop = (index<0?0:index)*-28+"px";
        }

    },
    // 判断下标
    indexof:function(dom){
        var listDoms =dom.parentElement.children;
        var index =0 ;
        for(var i=0;i<listDoms.length;i++){
            if(listDoms[i] == dom){
                index =i;
                break;
            }
        }
        return index;
    },
    // 判断同辈元素
    siblings:function(dom){
        var listDoms = dom.parentElement.children;
        var arr = [];
        for(var i = 0; i<listDoms.length; i++){
            if (listDoms[i] != dom) {
                arr.push(listDoms[i]);
            }
        }
        return arr;
    }
}