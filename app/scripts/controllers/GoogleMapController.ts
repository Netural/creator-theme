import { Controller } from '../lib/Controller';
import { google } from '../shims/Google';

export class GoogleMapController extends Controller {

    static selector: string = 'google-map';

    private mapComponent: HTMLElement;

    /**
     * Default Location for initialization.
     * In this case it's the BMW Höglinger HQ in Linz
     * 
     * @static
     * @type {Object} center
     */
    static center: any = { lat: 47.493971, lng: 13.346540 };
   
    /**
     * Locations of kld
     * 
     * @private
     * @type {*}
     * @memberOf GoogleMapController
     */
    private locations: any = [
        {
            lat: 47.2803513,
            lng: 11.4096578,
            info: 'kld Innsbruck'
        },
        {
            lat: 48.312663,
            lng: 14.298435,
            info: 'kld Linz'
        }
    ]

    /**
     * Current instance of a Google Maps
     * 
     * @private
     * @type {*} Google Map
     */
    private map: any;

    private markers: any = [];

    private waitingAttempts: number = 6;

    /**
     * Creates an instance of MapController.
     * 
     * @param {HTMLElement} element Selected Element from MapController.canvas
     */
    constructor(element: HTMLElement) {
        super(element);

        this.mapComponent = this.$();
        this.waitForGoogle();
    }

    waitForGoogle() {
        if (typeof google === 'object' && typeof google.maps === 'object') {
            this.initMap();
        } else {
            setTimeout(() => {
                if(this.waitingAttempts > 0) {
                    this.waitingAttempts--;
                    this.waitForGoogle();
                }    
            }, 500);
        }
    }

    /**
     * Initialize the current map with default values.
     */
    initMap() {
        // init Google Maps itself
        this.map = new google.maps.Map(this.mapComponent.querySelector('google-map-canvas'), {
            center: GoogleMapController.center,
            zoom: 8,
            scrollwheel: false,
            streetViewControl: false,
            rotateControl: false,
            disableDefaultUI: true,
            // draggable: false,
            styles: [{"stylers":[{"visibility":"on"},{"saturation":-100},{"gamma":0.54}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#4d4946"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"gamma":0.48}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"gamma":7.18}]}]
        });

        this.setMarkerOnMap();
    }

    /**
     * Transforms the current MarkerData to google maps markers
     * and saves them in the markes array.
     */
    setMarkerOnMap() {
        let icon: any = {
            url: '//a.storyblok.com/f/40059/09a1150639/map-marker.png',
            size: new google.maps.Size(23, 35),
            scaledSize: new google.maps.Size(23, 35),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 0).
            anchor: new google.maps.Point(20, 25)
        };

        // let bounds = new google.maps.LatLngBounds();
        
        for (let index = 0, max = this.locations.length; index < max; index++) {
            let location = this.locations[index];
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.lat, location.lng),
                map: this.map,
                icon: icon
            });
            this.markers.push(marker);
            // bounds.extend(new google.maps.LatLng(location.lat, location.lng));
        }

        // this.map.fitBounds(bounds);
        
        // Resize Event will be triggered once after markers are set.
        google.maps.event.trigger(this.map, 'resize');       
        
    }

}

