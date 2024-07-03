/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
				alias: {
					'@': './src',
					"@assets": './src/assets',
					'@screens': './src/screens',
                    '@components': './src/components',
                    '@hooks': './src/hooks',
                    '@shared': './src/shared',
				},
			},
		],
		'inline-dotenv',
		'react-native-reanimated/plugin', // needs to be last
	],
};
