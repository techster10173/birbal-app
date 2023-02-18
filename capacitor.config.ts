import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'app.birbal.advisor',
  appName: 'Birbal',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body
    },
    // SplashScreen: {
    //   lauchShowDuration: 1,
    //   launchAutoHide: false,
    //   backgroundColor: '#ca601d'
    // }
  }
};

export default config;
