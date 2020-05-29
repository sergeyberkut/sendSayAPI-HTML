//========================================================================
// Горизонтальный скролл

const horinztalScroll = () => {

	function scrollHorizontally(event) {

		const scrollPos = this.scrollLeft

		event = window.event || event

		const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)))
		this.scrollLeft -= (delta * 40)

		const widthElem = this.scrollWidth
		const widthBrowser = document.documentElement.clientWidth

		if ((delta == 1) && (!this.scrollLeft)) return

		if ((widthBrowser >= widthElem) || (scrollPos == this.scrollLeft)) return

		event.preventDefault()
	}

	const elem = document.querySelector('.scroll-mouse')

	elem.addEventListener("mousewheel", scrollHorizontally, false);
	elem.addEventListener("DOMMouseScroll", scrollHorizontally, false);
}

horinztalScroll()
//========================================================================


//========================================================================
// Появление окна с инструкциями

const queryActionsBlock = document.querySelector('.query-actions')
const queryActionsBlockWidth = queryActionsBlock.clientWidth
const body = document.querySelector('body')
const commandline = document.querySelector('.commandline')
const queryBtns = document.querySelectorAll('.commandline__item')
let elemId

commandline.onscroll = () => queryActionsBlock.classList.remove('active')


for (let queryBtn of queryBtns) {
	queryBtn.addEventListener('click', function () {

		let {
			id,
			offsetTop,
			clientHeight: actionBlockHeight,
			offsetLeft,
			clientWidth: actionBlockWidth,
			parentElement: {
				scrollLeft
			}
		} = this

		let resultLeftOffset


		if (id === elemId) {
			queryActionsBlock.classList.toggle('active')
		} else {
			elemId = id
			queryActionsBlock.classList.add('active')
		}


		if ((offsetLeft - scrollLeft + actionBlockWidth - body.clientWidth) > 0) {
			resultLeftOffset = body.clientWidth - queryActionsBlockWidth
		} else if ((offsetLeft - scrollLeft) < 0) {
			resultLeftOffset = 0
		} else {
			resultLeftOffset = offsetLeft + actionBlockWidth - queryActionsBlockWidth - scrollLeft
		}

		queryActionsBlock.style.cssText = `
					top: ${offsetTop + actionBlockHeight}px;
					left: ${resultLeftOffset}px
				`
	})
}

//========================================================================




//========================================================================
//Повление поп-апа Скопировано

const btn = document.querySelector('.query-actions__item.copy')

btn.addEventListener('click', function () {
	const copyNotice = document.querySelectorAll('.commandline__copy-notification')[elemId - 1]

	copyNotice.classList.add('active')
	queryActionsBlock.classList.remove('active')

	setTimeout(() => {
		copyNotice.classList.remove('active')
	}, 2000)
})

//========================================================================

function launchFullScreen(element) {
	if (element.requestFullScreen) {
		element.requestFullScreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}

function cancelFullscreen() {
	if (document.cancelFullScreen) {
		document.cancelFullScreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
}

const fullscreenBtn = document.querySelector('#fullscreenBtn')
// const closefullscreenBtn = document.querySelector('#closefullscreenBtn')

const app = document.querySelector('.app')

fullscreenBtn.onclick = () => launchFullScreen(app)
// closefullscreenBtn.onclick = () => cancelFullscreen()

//========================================================================


//========================================================================
// Расширешение окон

// я беру кликаю на дрэг, обрабатываю событие маусдаун
// беру оба поля, беру их ширины, считываю с события clientX где находится мышка,
// 	считаю отступ слева у поля, дальше устанавливаю этому полю ширину = clientX - offsetLeft
// маузмув в кейдавне

const drag = document.querySelector('.workspace__drag-column')

const requestField = document.querySelector('.workspace__field-column.request')


drag.onmousedown = () => {

	this.onmousemove = ({ x }) => {

		const result = requestField.clientWidth - (requestField.clientWidth - (x - requestField.offsetLeft))

		if (x > body.clientWidth - 430) {
			requestField.style.flexBasis = `${body.clientWidth - 430}px`
		} else {
			requestField.style.flexBasis = `${result}px`

		}
	}


	this.onmouseup = () => this.onmousemove = () => null

}

//========================================================================


