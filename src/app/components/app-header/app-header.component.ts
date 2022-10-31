import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  @Input() user!: any;

  @Output() onAction = new EventEmitter();
}
