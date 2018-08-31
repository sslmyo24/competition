var count = 0
var scrollEvent = false
var sh = $(window).height()
var theme = "tradition"
var lag = "Eng"
var url = "data/"+theme+lag+".json"
var start = 0

$.ajax({
	type: 'post',
	url: url,
	success:json => {
		let list = JSON.parse(json)
		let num = start
		if(start == 0 || start == (list.length - 2)) last = 2
		for (var i = 0; i < last; i++) {
			if(i == 0){
				if(start == 0) $(".center > image").css({background:""+list[num].img})
			}
		}
	}
})

function loadOn () {
	let style = `
		<style>
			.animation { opacity: 1; transition: .5s; transform: inherit; }
			.animation.animationBefore { opacity: 0; transition: .5s; }
			.theme.animationBefore { transform: translateX(-30px); }
			.content.animationBefore { transform: translateX(30px); }
		</style>`

	$("head").append(style)

	$(".animation").addClass('animationBefore')

	$("html, body").scrollTop(sh*count)
	$(".bullet:first-child").css({background:"#6789ca"})
	$(".bullet > .name").css({color:"#dfdfdd"})
}

function mouseScrollAnimation (e) {
	e.preventDefault()
	let delta = e.originalEvent.wheelDelta
	if (delta == -120 && scrollEvent == false && count < 4) {
		scrollEvent = true
		count++
	} else if (delta == 120 && scrollEvent == false && count >= 1) {
		scrollEvent = true
		count--
	}
	$("html, body").stop().animate({scrollTop:sh*count},
		{duration:100, complete: () => {
			scrollEvent = false
		}
	})
	$(".bullet").css({background:"#dfdfdd"})
	$(".bullet").eq(count).css({background:"#6789ca"})
	if(count == 0) $(".bullet > .name").css({color:"#dfdfdd"})
	else $(".bullet > .name").css({color:"#504e49"})
}

function clickScrollAnimation () {
	count = $(this).index()
	$("html, body").stop().animate({scrollTop:sh*count},
		{duration:100, complete: () => {
			scrollEvent = false
		}
	})
	$(".bullet").css({background:"#dfdfdd"})
	$(".bullet").eq(count).css({background:"#6789ca"})
	if(count == 0) $(".bullet > .name").css({color:"#dfdfdd"})
	else $(".bullet > .name").css({color:"#504e49"})
}

function scrollAnimation () {
	let st = $(window).scrollTop()
	let sb = st + sh
	$(".animation").each(function(idx) {
		let ot = $(this).offset().top
		let ob = ot + $(this).outerHeight()
		if (ot >= st && ob <= sb) {
			if($(this).hasClass('animationBefore')) $(this).removeClass('animationBefore')
		} else {
			if(!$(this).hasClass('animationBefore')) $(this).addClass('animationBefore')
		}
	})
}

$(loadOn)
.on("click",".bullet",clickScrollAnimation)
.on("mousewheel","html, body",mouseScrollAnimation)

$(window)
.on("scroll",scrollAnimation)