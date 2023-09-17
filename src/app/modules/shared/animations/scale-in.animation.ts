import { trigger, transition, style, animate } from '@angular/animations';

export const scaleInAnimation = trigger('scaleInAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0.8)', opacity: 0 }),
    animate(
      '300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      style({ transform: 'scale(1)', opacity: 1 })
    ),
  ]),
]);
