import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seat-display-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './seat-display-screen.component.html',
  styleUrl: './seat-display-screen.component.scss'
})

export class SeatDisplayScreenComponent implements OnInit {
  totalSeatsToBook : any ;
  seatData : any = [];
  reservedSeats: any = [];
  seatBookedMessage: string = '';

  stopBooking: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.totalSeatsToBook = params['numberOfSeats'];
    });
  }

  ngOnInit(): void {
    let latestSeatsData: any = localStorage.getItem('latestSeatsData') 
    if(latestSeatsData) {
      latestSeatsData = JSON.parse(latestSeatsData);
      if(latestSeatsData) {
        for(let item of latestSeatsData) {
          let filteredItems = item.filter((obj: { status: string; }) => obj.status == 'booked');
          for(let filteredItem of filteredItems){
            filteredItem['booked'] = false;
            filteredItem['already_booked'] = true;
          }
        }
      }
      
      this.seatData = latestSeatsData;
    } else {
      let seatData = this.createSeats();
      localStorage.setItem('latestSeatsData', JSON.stringify(seatData))
      this.seatData = seatData;
    }

    
    if(!this.isCoachFull(this.totalSeatsToBook)) {
      this.stopBooking = true;
      return;
    }

    
    if(this.totalSeatsToBook>0) {
      this.reserveSeats(this.totalSeatsToBook);
    }
  }

  createSeats() {
    // Create seat data for the booking if already not available;
    const seatData = [];
   
    for (let row = 0; row < 12; row++) {
      const seatRow = [];
  
      if (row < 11) {
        for (let seat = 1; seat <= 7; seat++) {
          const seatCode = String.fromCharCode(65 + row) + seat;
          seatRow.push({code : seatCode , status: 'free'});
        }
      } else {
        for (let seat = 1; seat <= 3; seat++) {
          const seatCode = String.fromCharCode(65 + row) + seat;
          seatRow.push({code : seatCode , status: 'free'});
        }
      }
      seatData.push(seatRow);
    }

    return seatData;
  }

  displaySeats(): void {
    console.log(this.seatData);
  }

  reserveSeats(numSeats: number): void {
    let seatsToReserve: any;

    seatsToReserve = [];
    for (const row of this.seatData) {
      const availableSeats = row.filter((seat: { status: string; }) => seat.status === 'free');
      for (const seat of availableSeats) {
        if (seatsToReserve.length < numSeats) {
          seatsToReserve.push(seat);
          seat.status = 'booked';
        } else {
          break;
        }
      }
      if (seatsToReserve.length === numSeats) {
        break;
      }
    
    }

    if (!seatsToReserve.length) {
      // If seats are not available in one row, book nearby seats
      for (const row of this.seatData) {
        for (const seat of row) {
          if (seat.status === 'free') {
            seatsToReserve.push(seat);
            seat.status = 'booked';
            numSeats--;
            if (numSeats === 0) {
              break;
            }
          }
        }
        if (numSeats === 0) {
          break;
        }
      }
    }

    if (seatsToReserve.length) {
      // Mark the reserved seats as booked
      seatsToReserve.forEach((seat: { status: string; }) => {
        seat.status = 'booked';
      });
      this.reservedSeats.push(...seatsToReserve);
      this.seatBookedMessage = seatsToReserve.map((seat: { code: any; }) => seat.code).join(', ');
    } else {
    }

    localStorage.setItem('latestSeatsData', JSON.stringify(this.seatData))
  }

  isCoachFull(numSeatsToCheck: number): boolean {
    const totalAvailableSeats = this.seatData.reduce((acc: any, row: []) => {
      return acc + row.filter((seat: { status: string; }) => seat.status === 'free').length;
    }, 0);
  
    if (totalAvailableSeats < numSeatsToCheck) {
      return false;
    } else { 
      return true;
    }
  }

  goBack() {
    this.router.navigate(['seat-input-screen']);
  }
  
}
