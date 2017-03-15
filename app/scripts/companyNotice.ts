let global: any = window;
if (typeof global.console !== 'undefined' && typeof global.console.log !== 'undefined') {
	global.console.log('Crafted and created by Netural. Visit www.netural.com');
	global.console.log('Crafted and powered by Storyblok. Visit www.Storyblok.com');
} else {
	global.console = {};
	global.console.log = global.console.error = function() {};
}
