export const environment = {
  production: true,
  shouldUseEmulator: () => {
    console.log('Running in dev mode, emulator is off');
    return false;
  },
};
