// LIVE
export let config = {
    url : window.location.hostname
}

// TEST
if (window.location.hostname.search(/6d654e70.me.storyblok.com/i) != -1) {
}

// DEV
if (window.location.hostname.search(/localhost/i) != -1 || window.location.hostname.search(/0.0.0.0/i) != -1) {
}