import {Component, OnInit, ViewChild} from '@angular/core';
import {} from 'google.maps';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const mapy = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat: 48.84931836994447, lng: 2.3897879422992827 },
      mapTypeId: 'roadmap',
    });
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(48.84931836994447, 2.3897879422992827),
      map: mapy
    });
  }

}
