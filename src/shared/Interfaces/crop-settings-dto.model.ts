export interface ICropSettingsDto {
    isNew: boolean;
    module: string | undefined;
    resizeToWidth: number | undefined;
    resizeToHeight: number | undefined;
    aspectRatio: number | undefined;
    containWithinAspectRatio: boolean;
  }
  export class CropSettings implements ICropSettingsDto {
    isNew: boolean;
    module: string | undefined;
    field: string | undefined;
    resizeToWidth: number | undefined;
    resizeToHeight: number | undefined;
    aspectRatio: number | undefined;
    containWithinAspectRatio: boolean;
  }
  export interface ICropOutput {
    isNew?: boolean;
    module: string | undefined;
    field: string | undefined;
    croppedimage: string | undefined;
  }
  export class CropOutput implements ICropOutput {
    isNew?: boolean;
    module: string | undefined;
    field: string | undefined;
    croppedimage: string | undefined;
  }
  