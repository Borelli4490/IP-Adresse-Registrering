import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPAddress, IPAddressCreate } from './ip-address.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {
  private apiUrl = 'http://localhost:5094/ipaddresses';

  constructor(private http: HttpClient) { }

  getIPAddresses(): Observable<IPAddress[]> {
    return this.http.get<IPAddress[]>(this.apiUrl);
  }

  registerIPAddress(ip: IPAddressCreate): Observable<IPAddress> {
    return this.http.post<IPAddress>(this.apiUrl, ip);
  }

  deleteIPAddress(id: number) {
    return this.http.delete<IPAddress>(`${this.apiUrl}/${id}`);
  }
}
