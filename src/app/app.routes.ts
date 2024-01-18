import { Routes } from '@angular/router';
import { SeatInputComponent } from './seat-input/seat-input.component';

export const routes: Routes = [
    { path: '', redirectTo: '/seat-input-screen', pathMatch: 'full' },
    { path: 'seat-input-screen', component: SeatInputComponent },
    { path: 'seat-display-screen', component: SeatInputComponent },
];
