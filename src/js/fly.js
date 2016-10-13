export default (function(){
	console.log('fly');

	const bottomClass = 'container-copy__fly--bottom';

	const flyContent = document.querySelector('.js-fly-content');
	const fly = flyContent.querySelector('.js-fly');
	const flyClose = flyContent.querySelector('.js-fly-close');

	function scrollFix(e){

		const contentBottom = document.body.scrollTop + flyContent.getBoundingClientRect().top + fly.clientHeight;
		const windowBottom = document.body.scrollTop + ( document.documentElement.clientHeight|| window.innerHeight );

		if (windowBottom >= contentBottom){
			!fly.classList.contains(bottomClass) && fly.classList.add(bottomClass);
		}else{
			fly.classList.contains(bottomClass) && fly.classList.remove(bottomClass);
		}
	}
	scrollFix();

	function removeFix(e){
		e.preventDefault();
		fly.classList.add(bottomClass);
		
		document.removeEventListener('scroll', scrollFix);
	}

	document.addEventListener('scroll', scrollFix);
	flyClose.addEventListener('click', removeFix);

})();
