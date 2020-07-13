module.exports = {
  name: 'display-config',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/display-config',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
