import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProfileComponent } from './components/profile/profile.component'
import { ProfileRoutingModule } from './profile-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ProfileService } from './services/profile.service'

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    // MATERIAL
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  declarations: [ProfileComponent],
  providers: [ProfileService],
})
export class ProfileModule {}
