import { Controller } from '../lib/Controller';
import { Swiper } from '../shims/Swiper';

export class FullScreenSwiperController extends Controller {

    static selector: string = 'full-screen-swiper';

    private autoplay: any = 3000;

    private swiper: any;

    constructor(element: HTMLElement) {
        super(element);
        this.initEvents();
        this.initSwiper();
    }  

    initSwiper() {
        let slides = this.$('.swiper-slide');
        if (slides && slides.length <= 1) {
            this.autoplay = false;
        }
        this.swiper = Swiper(this.$('.swiper-container')[0], {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 0,
            autoplay: this.autoplay,
            speed: 1000
        });
    }

    initEvents() {
        let section = this.$().parentElement;
        if (section) {
            let next = section.querySelector('.full-screen-swiper__next');
            let prev = section.querySelector('.full-screen-swiper__prev');
            if (next) {
                next.addEventListener('click', () => {
                    this.next();
                });
            }
            if (prev) {
                prev.addEventListener('click', () => {
                    this.prev();
                });
            }
        }
    }

    next() {
        if(this.swiper) {
            this.swiper.slideNext();
        }    
    }

    prev() {
        if (this.swiper) {
            this.swiper.slidePrev();
        }    
    }

}