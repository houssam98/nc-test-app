import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  @Input() user!: any

  @Output() onLogout = new EventEmitter()
}
