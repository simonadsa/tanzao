/*--- 圖片 ---*/
var $run = jQuery.noConflict();
$run(function(){
	// 先取得必要的元素並用 jQuery 包裝
	// 再來取得 $slides 的高度及設定動畫時間
	var isFirsrt = true;
	var $block = $run('#pciRunBlock'),$slides = $run('#player ul.list', $block),_height = $slides.find('li').height(),$li = $run('li', $slides),_animateSpeed = 800,timer, _speed = 9000;
	var $block2 = $run('#pciRunBlock2'),$slides2 = $run('#player2 ul.list2', $block2),_height2 = $slides2.find('li').height(),$li2 = $run('li', $slides2),_animateSpeed2 = 2200;
	
	// 先移到最後一張
	$slides.css({
		top: _height * ($li.length - 1) * -1
	});
	$slides2.css({
		top: _height2 * ($li2.length - 1) * -1
	});

	// 產生 li 選項
	var _str = '';
	for(var i=0, j=$li.length;i<j;i++){
		// 每一個 li 都有自己的 className = playerControl_號碼
		_str += '<li class="playerControl_' + (i+1) + '"><a href="javascript:;">' + (i+1) + '</a></li>';
	}
	
	// 產生 ul 並把 li 選項加到其中
	// 並幫 li 加上 mouseover 事件
	var $controlLi = $run('<ul class="playerControl"></ul>').html(_str).appendTo($slides2.parent()).find('li');
	$controlLi.click(function(){
		clearTimeout(timer);
		
		var $this = $run(this);
		$this.addClass('current').siblings('.current').removeClass('current');
		var $key = $this.index()+1;

		// 移動位置到相對應的號碼
		$slides.stop().animate({
			top: _height * ($li.length - $key) * -1
			}, _animateSpeed, function(){
				if(!_isOver) timer = setTimeout(moveNext, _speed);				
			}
		);		
		$slides2.stop().animate({
			top: _height2 * ($li2.length - $key) * -1
			}, _animateSpeed2, function(){
				//if(!_isOver) timer = setTimeout(moveNext, _speed);
			}
		);

	//description
	// $run('#pciRunDesc').show();
    // $run('#pciRunDesc ul li').attr("class","last-active");
    // $run('#pciRunDesc ul li[id=lidesc_'+$key+']').attr("class","active");
	
		return false;
	}).eq(0).click();
	
	// 當滑鼠移到 $block 時則停止輪播
	// 移出時則繼續輪播
	var _isOver = false;
	$block.mouseenter(function(){
		clearTimeout(timer);
		_isOver = true;
	}).mouseleave(function(){
		_isOver = false;
		timer = setTimeout(moveNext, _speed);
	});
	// 用來控制移動的函式
	function moveNext(){
		var _now = $controlLi.filter('.current').index();
		$controlLi.eq((_now+1) % $controlLi.length).click();
		
	}
	
	// 啟動計時器
	if(isFirsrt){
		timer = setTimeout(moveNext, _speed+_speed+_speed);
		isFirsrt =false;
	}else{
		timer = setTimeout(moveNext, _speed);
	}
});
/*--- 圖片 ---*/
/*--- 選單 ---*/
var $menu = jQuery.noConflict();
$menu(function(){
	// 先取得相關選單元素及高度
	var $menuWrapper = $menu('#menu-wrapper'), 
		$subMenuWwrapper = $menuWrapper.find('.sub-menu-wrapper').add($menuWrapper.find('.sub-menu')), 
		_height = $subMenuWwrapper.height(), 
		_animateSpeed = 200;
 
	// 先把 $subMenuWwrapper 的高度歸 0
	// 並把 .sub-menu ul 先往上移動隱藏
	var $subMenu = $subMenuWwrapper.height(0).find('.sub-menu p').css({
		top: _height * -1
	});
 
	// 當滑鼠移入到 .main-menu ul li a 上時
	$menu('.main-menu ul li a').mouseover(function(){
		// 先取出被滑鼠移入的選單
		var $this = $menu(this), 
			_no = $this.parent().index();
		if(_no !=0 && _no!=4 && _no!=5){
 
			// $subMenuWwrapper 展開高度
			$menu('#top_d_1').stop().animate({
				top:-75,
				height: 40+_height
			},_animateSpeed);
			$subMenuWwrapper.stop().animate({
				height: _height
			}, _animateSpeed);
 
			// 移動相對應的子選單
			$subMenu.eq(_no).stop().animate({
			top: 0
			}, _animateSpeed).siblings().stop().animate({
				top: _height * -1
			}, _animateSpeed);
 
			// 讓被滑鼠移入的選單加上指定的效果
			$this.addClass('selected').parent().siblings().find('a.selected').removeClass('selected');
		}
 
		return false;
	});
 
	// 當滑鼠移出 $menuWrapper 後把 $subMenuWwrapper 的高度歸 0
	$menuWrapper.mouseleave(function(){
		$menu('#top_d_1').stop().animate({
			top:0,
			height: 40
		},_animateSpeed);
		$subMenuWwrapper.stop().animate({
			height: 0
		}, _animateSpeed);
	});
});
/*--- 選單 ---*/