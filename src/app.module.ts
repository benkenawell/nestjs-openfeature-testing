import { Module } from '@nestjs/common';
import { OpenFeatureModule, InMemoryProvider } from '@openfeature/nestjs-sdk';
import { FlagsController } from './flags.controller';

@Module({
  imports: [
    OpenFeatureModule.forRoot({
      defaultProvider: new InMemoryProvider({
        'welcome-message': {
          defaultVariant: 'on',
          variants: { on: true, off: false },
          disabled: false,
        },
        'banner-color': {
          defaultVariant: 'blue',
          variants: { blue: 'blue', red: 'red', green: 'green' },
          disabled: false,
        },
        'max-items': {
          defaultVariant: 'default',
          variants: { default: 25, high: 100 },
          disabled: false,
        },
      }),
      contextFactory: (executionContext) => {
        const request = executionContext.switchToHttp().getRequest();
        return {
          targetingKey: request.headers['x-targeting-key'] ?? 'anonymous',
        };
      },
    }),
  ],
  controllers: [FlagsController],
})
export class AppModule {}
