/* 
 *
 *  
 *       *         *         *
 *        *       * *       * 
 *         *     *   *     *
 *          *   *     *   *
 *           * * ** ** * *
 *            *         *
 *           *           *
 *          *             *
 *         *               *
 *   *    *                 *    *
 *     *************************
 *    没做响应式测试，如需请自行测试
 * 
 */



(function($){
	
	$.fn.Tab= function(options){
		
		//默认值
		var defaultVal = {
			listClass:'.tablist',	/*按钮的直接父级Class*/
			conClass:'.tabtext',	/*内容的直接父级Class*/
			icon:'.btn',//小圆点父级Class
			bind:'click',	/*事件参数 click,hover*/
			animation:'none',	/*动画方向 left,up,fadein,none为无动画*/
			speed:300, 	/*动画运动速度*/	
			auto:true, /*自动运行*/
			pvnt:false, //是否显示切换按钮
			aicon:false,	//是否显示小圆点
		};
		
		//全局变量
		var obj = $.extend(defaultVal, options),
			evt = obj.bind,
			list = $(this).find(obj.listClass),
			con = $(this).find(obj.conClass),
			anima = obj.animation,
			conWidth = con.width(),//单个content的宽度
			conHeight = con.height(),//单个content高度
			len = con.children().length,//content个数
			bw = len * conWidth, //所有content的总宽度
			bh = len * conHeight,//所有content的总高度
			oIcon=$(obj.icon).find('ul'),
			i=list.children('.on').index(),	
			adicon=obj.aicon,	//小圆点
			bpvnt=obj.pvnt ,//切换按钮
			time; 

		function ac(){
			var iw = i * conWidth,//
				ih = i * conHeight;//
				//console.log();
			list.children().removeClass('on').eq(i).addClass('on');
			oIcon.children().removeClass('active').eq(i).addClass('active');
			//判断tab内容的动画
			switch(anima){
				case 'none':
				con.children().eq(i).show().siblings('li').hide();
				break;
				case 'fadein':	
				con.children().css("position","absolute").eq(i).fadeIn(obj.speed).siblings('li').fadeOut(obj.speed);
				break;
				case 'left':
				con.css({position:'absolute',width:bw}).children().css({float:'left',display:'block'}).end().stop().animate({left:-iw},obj.speed);
				break;
				case 'up':
				con.css({position:'absolute',height:bh}).children().css({display:'block'}).end().stop().animate({top:-ih},obj.speed);
				break;				
			}
			
		};

		//判断鼠标事件 hover or click
		if(evt == "hover"){
				list.children().hover(function(){
					//alert($(this).html());
					i = $(this).index();						
					ac();
				})
			}else{
				list.children().on(evt,function(){
					 //alert($(this).html());
					i = $(this).index();
					ac();
					//console.log();
				});				
			}


		//自动执行	
        function starttime(){
				time = setInterval(function(){
					i++;
					if(i>=len){
						switch(anima){
							case 'left':
							con.stop().css({left:conWidth});
							break;
							case 'up':
							con.stop().css({top:conHeight});
						}	
						i=0;
					}
					ac();
				},3000)
			}

		//判断是否自动执行
		if(obj.auto){
				$(this).hover(function(){
					clearInterval(time);
				},function(){
					starttime();
				})
				starttime();
			}	

		//切换按钮 next ，prev
		if(bpvnt){
			$(this).append('<div class="prev">prev</div>');
			$(this).append('<div class="next">next</div>');
			$('.prev').on('click',function (){
				i--;
				//alert(i);
				if( i <= -1 ){
					i=len-1;
				}	
				ac();		
			})

			$('.next').on('click',function (){
				i++;
				//alert(i);
				if( i >= len ){
					i=0;
				}	
				ac();		
			});
		}
		//动态添加小图标
        if (adicon) {
			for (var j = 0; j < len; j++) {
				oIcon.append('<li></li>');		//'+(j+1)+'			
				};
			//为当前显示的小圆点添加样式
			oIcon.children().removeClass('active').eq(i).addClass('active');
			oIcon.children().click(function(){
				i = $(this).index();
				ac();
			});
		}


//Need to improve
	};

})(jQuery);