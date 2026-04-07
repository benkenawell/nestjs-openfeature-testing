import { Controller, Get } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  BooleanFeatureFlag,
  StringFeatureFlag,
  NumberFeatureFlag,
  EvaluationDetails,
} from '@openfeature/nestjs-sdk';

@Controller('flags')
export class FlagsController {
  /**
   * GET /flags/welcome
   * Uses the BooleanFeatureFlag decorator to inject the 'welcome-message' flag.
   */
  @Get('welcome')
  async getWelcome(
    @BooleanFeatureFlag({ flagKey: 'welcome-message', defaultValue: false })
    flag: Observable<EvaluationDetails<boolean>>,
  ) {
    return firstValueFrom(
      flag.pipe(
        map((details) => ({
          flag: details.flagKey,
          value: details.value,
          variant: details.variant,
          reason: details.reason,
          message: details.value
            ? 'Welcome to the OpenFeature-enabled NestJS app!'
            : 'Welcome to the NestJS app.',
        })),
      ),
    );
  }

  /**
   * GET /flags/banner
   * Uses the StringFeatureFlag decorator to inject the 'banner-color' flag.
   */
  @Get('banner')
  async getBanner(
    @StringFeatureFlag({ flagKey: 'banner-color', defaultValue: 'gray' })
    flag: Observable<EvaluationDetails<string>>,
  ) {
    return firstValueFrom(
      flag.pipe(
        map((details) => ({
          flag: details.flagKey,
          value: details.value,
          variant: details.variant,
          reason: details.reason,
        })),
      ),
    );
  }

  /**
   * GET /flags/max-items
   * Uses the NumberFeatureFlag decorator to inject the 'max-items' flag.
   */
  @Get('max-items')
  async getMaxItems(
    @NumberFeatureFlag({ flagKey: 'max-items', defaultValue: 10 })
    flag: Observable<EvaluationDetails<number>>,
  ) {
    return firstValueFrom(
      flag.pipe(
        map((details) => ({
          flag: details.flagKey,
          value: details.value,
          variant: details.variant,
          reason: details.reason,
        })),
      ),
    );
  }
}
