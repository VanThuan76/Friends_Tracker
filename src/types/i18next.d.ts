import * as en from '@/shared/translations/en';
import { defaultNS } from '@/shared/translations';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: typeof en;
	}
}
