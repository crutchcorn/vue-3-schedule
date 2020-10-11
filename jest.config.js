module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['./jest.setup.js']
}
