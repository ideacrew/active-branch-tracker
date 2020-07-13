module.exports = {
  name: 'branches-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/branches/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
