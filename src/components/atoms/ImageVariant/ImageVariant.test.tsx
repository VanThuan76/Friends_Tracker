import { render, screen } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';

import { ThemeProvider } from '@/shared/theme';
import sourceLight from '@/shared/icons/tom_light.png';
import sourceDark from '@/shared/icons/tom_dark.png';

import { isImageSourcePropType } from '@/types/guards/image';

import ImageVariant from './ImageVariant';

describe('ImageVariant component should render correctly', () => {
	let storage: MMKV;

	beforeAll(() => {
		storage = new MMKV();
	});

	test('with only default image and dark variant. Should return default source', () => {
		if (!isImageSourcePropType(sourceLight)) {
			throw new Error('Image source is not valid');
		}

		const component = (
			<ThemeProvider storage={storage}>
				<ImageVariant source={sourceLight} />
			</ThemeProvider>
		);

		render(component);

		const wrapper = screen.getByTestId('variant-image');

		expect(wrapper.props.source).toBe(sourceLight);
	});

	test('with default image dark image and dark variant. Should return dark source', () => {
		storage.set('theme', 'dark');
		if (!isImageSourcePropType(sourceDark)) {
			throw new Error('Image source is not valid');
		}

		const component = (
			<ThemeProvider storage={storage}>
				<ImageVariant source={sourceDark} sourceDark={sourceDark} />
			</ThemeProvider>
		);

		render(component);

		const wrapper = screen.getByTestId('variant-image');

		expect(wrapper.props.source).toBe(sourceDark);
	});
});
