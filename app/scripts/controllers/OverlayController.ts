import { Controller } from '../lib/Controller';
import { render } from '../lib/dom';

export class OverlayController extends Controller {

    static selector: string = '[data-overlay-trigger]';

    static overlay: HTMLElement;  
    static overlayHero: HTMLElement;
    
    constructor(element: HTMLElement) {
        super(element);
        this.addEventListener();
    }

    addEventListener() {
        if (!OverlayController.overlay) {
            OverlayController.overlay = <HTMLElement>document.body.querySelector('.overlay');  
            let closeButton = OverlayController.overlay.querySelector('[data-overlay-close]');
            if (closeButton) {
                closeButton.addEventListener('click', () => { this.close(); });
            }
        }
        if (!OverlayController.overlayHero) {
            OverlayController.overlayHero = <HTMLElement>document.body.querySelector('.overlay-hero'); 
            OverlayController.overlayHero.addEventListener('click', () => { this.close(); });
        }
        this.$().addEventListener('click', () => { this.open() });
    }

    close() {
        OverlayController.overlay.classList.remove('overlay--active');
    }

    open() {
        while (OverlayController.overlay.firstChild) {
            OverlayController.overlay.removeChild(OverlayController.overlay.firstChild);
        }

        let fragment = render(this.$().querySelector('[data-overlay-content]').innerHTML);

        OverlayController.overlay.appendChild(fragment);
        
        let closeButtons = OverlayController.overlay.querySelectorAll('[data-overlay-close]');
        for (let index = 0, max = closeButtons.length; index < max; index++) {
            let closeButton = closeButtons[index];
            closeButton.addEventListener('click', () => { this.close(); });
        }

        OverlayController.overlay.classList.add('overlay--active');
    }
}