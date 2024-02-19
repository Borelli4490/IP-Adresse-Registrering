import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { IPAddress, IPAddressCreate } from './ip-address.model';
import { IpAddressService } from './ip-address.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  ipAddresses: IPAddress[] = [];
  newIPAddress: IPAddressCreate = { ip: '', description: '', creator: ''};

  constructor(private ipAddressService: IpAddressService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchIPAddresses();
  }

  fetchIPAddresses(): void {
    this.ipAddressService.getIPAddresses().subscribe({
      next: (data) => {
        this.ipAddresses = data;
      },
      error: (error) => {
        console.error('Error fetching IP addresses:', error);
      },
    });
  }

  registerIPAddress(): void {   
    this.ipAddressService.registerIPAddress(this.newIPAddress).subscribe({
      next: (data) => {
        this.fetchIPAddresses();
      },
      error: (error) => {
        // If the error is a 409 (Conflict) error, it means the IP address is already registered
        if (error.status === 409) {
          this.openDialog()
        } else {
        console.error('Error registering IP address:', error);
        }
      }
    });
  }

  deleteIPAddress(id: number): void {
    this.ipAddressService.deleteIPAddress(id).subscribe({
      next: () => {
        this.fetchIPAddresses();
      },
      error: (error) => {
        console.error('Error deleting IP address:', error);
      },
    });
  }

  // Check if the input is a valid IP address (either IPv4 or IPv6)
  iPAddressIsValid(ip: string) {
    // No need to show the error message if the input is empty
    if (ip === '') {
      return true;
    }

    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;
    if (ipv4Regex.test(ip)) {
      return ip.split('.').every((part) => parseInt(part) <= 255);
    }
    if (ipv6Regex.test(ip)) {
      return ip.split(':').every((part) => part.length <= 4);
    }

    return false;
  }

  openDialog(): void {
    this.dialog.open(DialogIpAdress);
  }
}

@Component({
  selector: 'dialog-ip-address',
  templateUrl: 'dialog-ip-address.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogIpAdress {
  constructor(
    public dialogRef: MatDialogRef<DialogIpAdress>,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
