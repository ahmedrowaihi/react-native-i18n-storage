export type I18nStorageModule = {
  setI18nStorage(payload: string): Promise<void>;
};

export type I18nStorageSchema = {
  locale: string;
  forceRTL: boolean;
  allowRTL: boolean;
  doLeftAndRightSwapInRTL: boolean;
};
