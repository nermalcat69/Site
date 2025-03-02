import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastRef: ComponentRef<ToastComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(message: string, duration: number = 2000) {
    // Remove existing toast if any
    this.clear();

    // Create and attach the toast component
    const toastComponent = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    // Set the message and duration
    toastComponent.instance.message = message;
    toastComponent.instance.duration = duration;

    // Add to the DOM
    document.body.appendChild(toastComponent.location.nativeElement);

    // Attach to the application
    this.appRef.attachView(toastComponent.hostView);

    // Store the reference
    this.toastRef = toastComponent;

    // Clean up after duration
    setTimeout(() => {
      this.clear();
    }, duration + 200); // Add 200ms for animation
  }

  private clear() {
    if (this.toastRef) {
      this.appRef.detachView(this.toastRef.hostView);
      this.toastRef.destroy();
      this.toastRef = null;
    }
  }
} 