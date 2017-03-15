let global: any = window;
if (typeof global.console !== 'undefined' && typeof global.console.log !== 'undefined') {
	global.console.log('Crafted and created by Netural. Visit www.netural.com');
	global.console.log('Powered by Storyblok. Visit www.storyblok.com');
} else {
	global.console = {};
	global.console.log = global.console.error = function() {};
}
