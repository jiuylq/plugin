

var book_id=GC("id"),
id=GC("type_id"),
sid=GC("sid"),
DATA,
LIKE,
LIST,
book_finish,
book_update_time,
o,
ind,
deloading=$(".loadOpt");



var bookData=function(){

//当前页面数据
$.ajax({
type: 'GET',
url: ''+ API +'/book/list_by_ids',
data: {
    ids:book_id
},
dataType: 'json',
success: function(data) {
    DATA=data.result[0];
    j();
    deloading.css("display","none");
    hidd.css("overflow-y","scroll");
},
error: function(xhr, type) {
    //console.log('Ajax error!')
}
});
},
bookList=function() {
//章节数据
    $.ajax({
    type:'GET',
    url: ''+ API +'/chapter/list',
    data:{
        book_id:book_id
    },
    dataType: 'json',
    success: function(data) {
        LIST = data.result.rows;
        l(),c();
    },
    error: function(xhr, type) {
        //console.log('Ajax error!')
    }
})
},
bookLike=function(){
$.ajax({
type:'GET',
url: ''+ API +'/online/books',
data:{
    book_id:1,
    orderby:'update_time',
    order:0,
    page_num:1,
    page_size:18
},
dataType: 'json',
success: function(data) {
    LIKE=data.result;
    bookList(),g();
},
error: function(xhr, type) {
    //console.log('Ajax error!')
}
})
},
j=function (){
//console.log(DATA);
    bookLike();
    book_finish=DATA.finish ? "已完结" : "连载中" ;
    var time=DATA.update_time;
    var str=DATA.hot.toString(),nn=str.length,m,r;
    
    // 格式化人数（1）
    // 
    // var num = time = function (){
    // 	 var e=arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e4 , t = void 0;
//           return e > 1e4 && 1e8 > e ? t = (e / 1e4).toFixed(2) + "万" : 1e8 > e ? 1e4 > e && (t = e) : t = (e / 1e8).toFixed(2) + "亿", t;
       
//          }


    // 格式化人数（2）
    function formatFloat(str, pos){
        var re =new RegExp("(?=(?!(\\b))(\\d{"+m+"})+$)","g");
        str=str.replace(re,".");
        return Math.round(str*Math.pow(10, pos))/Math.pow(10, pos);
    };
        if( 0 <= nn && nn <4 ){
            r=str;
        }else if( 4 <= nn && nn <= 8 ){
            m=4;
            r=formatFloat(str, 2) + "万";
        }else if( 8 < nn && nn <= 13 ){
            m=8;
            r=formatFloat(str, 2)+ "亿";
        }else if( 13< nn){
            m=13;
            r=formatFloat(str, 2)+ "兆";
        }
    function k(e) {
        var t = new Date(e);
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate()
     };
    book_update_time=k(time);
    $("#top .cover").append('<img src="'+ DATA.logo_url +'">');
    var tod=$("#top .top_d"),det=$("#detail_d .up_detail");
    var tHtml='<div class="title"><span class="name">'+ DATA.name+'</span><span class="author">'+DATA.author+'</span></div>';
        tHtml+='<div class="top_tab"><div class="topbar_tab_left">'+book_finish+'</div><div class="topbar_tab_center">'+DATA.type_name+'</div><div class="topbar_tab_right">'+r+'人气</div></div>';
        tHtml+='<div class="top_backgroundImg" style="background-image:url('+DATA.logo_url+')"></div>';
            //window.scroll(0, 0);
        tod.children().remove();
        det.children().remove();
        tod.append(tHtml);
    var dHtml='<div class="updata">上次更新：<span>'+book_update_time+'</span></div>';
        dHtml+='<p>内容简介：</p><div class="detail-box"><p id="detail" class="ellipsis-2">'+DATA.description+'</p><div class="tags"><div class="tags_item">'+book_finish+'</div><div class="tags_item">来源：<span>'+DATA.source_fr[0]+'</span></div></div>'
        det.append(dHtml);

},
g=function(){
var gb=$("#guess_you_favorite .guess_change_btn"),
    gi=$("#guess_you_favorite .module-item-three"),
    gbt=$(".guess_change_btn"),
    gte=$("#detail"),
    gHtml='';
    gte.on('click',function(){
        $(this).toggleClass('ellipsis-2');
        o.slideTo(ind);
    });
    $(".guess_favorite").css("display","flex");
    var t=gbt.children("img").data("rotate");
        //初次加载数据默认为前6个
    var LIKEn=LIKE.rows.slice(0,6);
        chage();
    gb.on('click' ,function(){
        //console.log($(this));
        var that=$(this);
        t= t+ 360;
        that.children("img").css("transform","rotate("+t+"deg)");
        that.children("img").data("roate",t);
        LIKEn=getArrayItems(LIKE.rows,6);
        gi.children().remove();
        chage()
        
    });
    function chage(){
        for(var i=0;i<LIKEn.length;i++){
                gHtml+='<div class="module-item "><a href="javascript:void(tiaoz(' + LIKEn[i].id + "," + LIKEn[i].type_id + "," + LIKEn[i].source_book_list[0].sid + '))"><img src="'+LIKEn[i].logo_url+'" alt=""><p>'+LIKEn[i].name+'</p></a></div>'
        };
        gi.append(gHtml);
        //清空
        gHtml='';
    };
    //随机函数
    function getArrayItems(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i<num; i++) {
            if (temp_array.length>0) {
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    };
    lazy.init({
        offset: 30,
        throttle: 500,
        unload: false,
    });
},
l=function(){


o = new Swiper('#tabs-container',{
    speed: 50,
    autoHeight: true,
    // parallax : true,
    onSlideChangeStart: function(){
      $(".tabs .active").removeClass('active');
      $(".tabs a").eq(o.activeIndex).addClass('active');
      ind=o.activeIndex;
    }
  });
      $(".tabs a").on('touchstart mousedown',function(e){
        e.preventDefault()
        $(".tabs .active").removeClass('active')
        $(this).addClass('active')
        o.slideTo( $(this).index() )
      })
      $(".tabs a").click(function(e){
        e.preventDefault()
      })
},
c=function(){
var book=$("#book_box"),
    ctn=$(".chapters-bar .chapters-num"),
    rev=$(".chapters-bar .reverse"),
    lMore=$(".content-right .book_more")
    bHtml='',
    e=0,
    k=1;
    //初始化数据
    $(".chapters-num>span").text(LIST.length);
    //console.log(LIST);
    cp();
    rev.on('click',function(){
        e+=180;
        rev.children("img").css("transform","rotate("+e+"deg)")
        LISTk=LIST.reverse();//倒序
        cp();
    });
    function cp(){
        if(k%2){
            var LISTk=LIST.slice(0,8);		
        }else{
            LISTk=LIST;
        };

        for(var i=0;i<LISTk.length;i++){
            bHtml+='<a class="book_item" href="javascript:;" data-href="'+LISTk[i].url+'">第'+LISTk[i].index+'话</a>';
        }
        book.children().remove();
        book.append(bHtml);
        bHtml='';
        
    };
    lMore.on('click',function(){
        k+=1;
        (k%2)? lMore.text("查看更多") : lMore.text("收起");

        cp();
        o.slideTo(ind);
    });
    
};
// tiaoz=function(bookid ,typeid ,sid) {
// 	var setId={
// 	        "id":bookid,
// 	        "type_id":typeid,
// 	        "sid":sid
// 	    };
// 	    SC("id",bookid),SC("type_id",typeid),SC("sid",sid);
// 		setTimeout(function(){
// 	        window.location.href="detail.html";
// 	    } ,300)
    
// };

bookData();

$("#book_box").on("click" , ".book_item" ,function(){
alert("别人不让看，我也没办法！");
})
