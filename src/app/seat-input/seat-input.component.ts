import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-seat-input',
  templateUrl: './seat-input.component.html',
  styleUrl: './seat-input.component.scss'
})

export class SeatInputComponent implements OnInit{
  seatInputForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.seatInputForm = this.fb.group({
      numberOfSeats: new FormControl('', [Validators.required, Validators.min(1), Validators.max(7)])
    });
  }

  onSubmit() {

    // Handling Form Submission;
    if (this.seatInputForm.valid) {
      // Navigate to seat display screen;
      this.router.navigate(['/seat-display-screen'], { queryParams: { numberOfSeats: this.seatInputForm.value.numberOfSeats }} );
    } 
  }
}
