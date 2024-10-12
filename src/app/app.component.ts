import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { SecondComponentComponent } from './components/second-component/second-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FirstComponentComponent, SecondComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'newApp';

  @ViewChild('firstComponent') firstComponent!: ElementRef;
  @ViewChild('secondComponent') secondComponent!: ElementRef;

  smoothScroll(target: ElementRef) {
    const targetPosition = target.nativeElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    const duration = 1000;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
  scrollToComponent(component: string) {
    if (component === 'first') {
      this.smoothScroll(this.firstComponent);
    } else if (component === 'second') {
      this.smoothScroll(this.secondComponent);
    }
  }
}
