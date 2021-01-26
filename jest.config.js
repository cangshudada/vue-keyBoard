module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ["jest-canvas-mock"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/$1'
  }
}
