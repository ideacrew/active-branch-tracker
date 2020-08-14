export const environment = {
  production: false,
  shouldUseEmulator: () => {
    console.log('Running in emulator mode, emulator is on');
    return true;
  },
};
