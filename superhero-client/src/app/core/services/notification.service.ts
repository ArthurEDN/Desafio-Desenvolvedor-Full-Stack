import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'danger';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'danger' = 'success') {
    const newToast = { message, type, id: Date.now() };
    this.toasts.update(currentToasts => [...currentToasts, newToast]);
    setTimeout(() => this.remove(newToast.id), 5000);
  }

  remove(id: number) {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
}