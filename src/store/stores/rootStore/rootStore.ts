import { AuthStore } from '../authStore';

export class RootStore {
  authStore!: AuthStore;

  init(): void {
    this.authStore = new AuthStore();
  }

  reset(): void {
    this.authStore.reset();
  }
}
