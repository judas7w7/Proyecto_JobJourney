import { Component } from '@angular/core';
import { SectionRegisterComponent } from '../section-register/section-register.component';
import { SectionSearchComponent } from '../section-search/section-search.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionRegisterComponent, SectionSearchComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
