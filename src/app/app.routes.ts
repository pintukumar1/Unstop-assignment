import { Routes } from '@angular/router';
import { SeatInputComponent } from './seat-input/seat-input.component';
import { SeatDisplayScreenComponent } from './seat-display-screen/seat-display-screen.component';

export const routes: Routes = [
    { path: '', redirectTo: '/seat-input-screen', pathMatch: 'full' },
    { path: 'seat-input-screen', component: SeatInputComponent },
    { path: 'seat-display-screen', component: SeatDisplayScreenComponent },
];
