import { IsOldPipe } from './is-old.pipe';

describe('IsOldPipe', () => {
  it('create an instance', () => {
    const pipe = new IsOldPipe();
    expect(pipe).toBeTruthy();
  });
});
