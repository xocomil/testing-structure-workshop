import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <button class="btn btn-secondary">Test Button</button>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'testing-structure-workshop';
}
