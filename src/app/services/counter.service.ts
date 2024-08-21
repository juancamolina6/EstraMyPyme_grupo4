import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private views: number = 0;
  private downloads: number = 0;
  private registrations: number = 0;

  getViews(): number {
    return this.views;
  }

  getDownloads(): number {
    return this.downloads;
  }

  getRegistrations(): number {
    return this.registrations;
  }

  incrementViews() {
    this.views++;
  }

  incrementDownloads() {
    this.downloads++;
  }

  incrementRegistrations() {
    this.registrations++;
  }
}