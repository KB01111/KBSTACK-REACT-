module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@navigation': './src/navigation',
            '@services': './src/services',
            '@assets': './src/assets',
            '@types': './src/types',
            '@constants': './src/constants',
            '@contexts': './src/contexts',
            '@theme': './src/theme'
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      ]
    ]
  };
};
