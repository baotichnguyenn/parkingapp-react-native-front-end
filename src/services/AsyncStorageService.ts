import { StorageKeys } from "@/constants/Storagekeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AsyncStorageService {
  setAuthData(authData: any) {
    this._setItem(StorageKeys.AUTH_DATA, authData);
  }

  setOwnerAuthData(OwnerauthData: any) {
    this._setItem(StorageKeys.AUTH_DATA, OwnerauthData);
  }
  setProfile(profile: any) {
    this._setItem(StorageKeys.PROFILE, profile);
  }

  setToken(token: string) {
    this._setItem(StorageKeys.TOKEN, token);
  }

  getToken() {
    return this._getItem(StorageKeys.TOKEN);
  }

  getAuthData() {
    const authValue = this._getItem(StorageKeys.AUTH_DATA);
    return authValue;
  }
  getOwnerAuthData() {
    return this._getItem(StorageKeys.AUTH_DATA);
  }
  removeAuthData() {
    this._removeItem(StorageKeys.AUTH_DATA);
  }
  removeToken() {
    this._removeItem(StorageKeys.TOKEN);
  }
  private async _setItem(key: StorageKeys, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("SetItemError: ", e);
    }
  }

  private async _getItem(key: StorageKeys) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (e) {
      console.error("GetItemError: ", e);
    }
  }
  private async _removeItem(key: StorageKeys) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log("RemoveItemError: ", e);
    }
  }
}
