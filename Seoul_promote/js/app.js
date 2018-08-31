var count = 0
var scrollEvent = false
const sh = $(window).height()

function loadOn () {
	$(".bullet:first-child").css({background:"#6789ca"})
}

function mouseScrollAnimation (e) {
	e.preventDefault()
	var delta = e.originalEvent.wheelDelta
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
}

$(loadOn)
.on("click",".bullet",clickScrollAnimation)
.on("mousewheel","html, body",mouseScrollAnimation)