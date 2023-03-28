import { CropSettings } from '../Interfaces/crop-settings-dto.model';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class CropSettingService {

  setEventBanner(): CropSettings {
    return {
        isNew: true,
        module: 'EventManagement',
        field: 'eventbanner',
        resizeToWidth: 0, // 210
        resizeToHeight: 0, // 333
        aspectRatio: 2.2 / 2.775,
        containWithinAspectRatio: true,
    };
}

  setAdImageImage(): CropSettings {
      return {
          isNew: true,
          module: 'Ad',
          field: 'adImage',
          resizeToWidth: 0,
          resizeToHeight: 0,
          aspectRatio: 9 / 16,
          containWithinAspectRatio: true,
      };
  }

  setBusinessSectorImage(): CropSettings {
      return {
          isNew: true,
          module: 'BusinessSector',
          field: 'businessSectorImage', 
          resizeToWidth: 0,
          resizeToHeight: 0, 
          aspectRatio: 2.89 / 1.73,
          containWithinAspectRatio: true,
      };
  }
  setBusinessSectorVoucherImage(): CropSettings {
      return {
          isNew: true,
          module: 'BusinessSector',
          field: 'businessSectorVoucherImage', 
          resizeToWidth: 0,
          resizeToHeight: 0, 
          aspectRatio: 0.8 / 1,
          containWithinAspectRatio: true,
      };
  }

  setBrandMobileImage(): CropSettings {
      return {
          isNew: true,
          module: 'Brand',
          field: 'mobileBackgroundImage', 
          resizeToWidth: 0, 
          resizeToHeight: 0,
          aspectRatio: 2.89 / 1.73,
          containWithinAspectRatio: true,
      };
  }

  setBrandWebsiteImage(): CropSettings {
      return {
          isNew: true,
          module: 'Brand',
          field: 'websiteBackgroundImage', 
          resizeToWidth: 0, 
          resizeToHeight: 0,
          aspectRatio: 2.89 / 1.73,
          containWithinAspectRatio: true,
      };
  }

  
  setCivilId(): CropSettings {
      return {
          isNew: true,
          module: 'MemberSubscription',
          field: 'civilId', 
          resizeToWidth: 0, //170px
          resizeToHeight: 0, //285px
          aspectRatio: 2.89 / 1.73,
          containWithinAspectRatio: true,
      };
  }

  setMasterCardImage(): CropSettings {
      return {
          isNew: true,
          module: 'MasterCard',
          field: 'masterCardImage', 
          resizeToWidth: 0, //170px
          resizeToHeight: 0, //285px
          aspectRatio: 5.65 / 3.75,
          containWithinAspectRatio: true,
      };
  }

  setOfferMainImage(): CropSettings {
      return {
          isNew: true,
          module: 'Offer',
          field: 'offermainImage', 
          resizeToWidth: 0, //170px
          resizeToHeight: 0, //285px
          aspectRatio: 1.416 / 2.375,
          containWithinAspectRatio: true,
      };
  }

  setOfferBackgroundImage(): CropSettings {
      return {
          isNew: true,
          module: 'Offer',
          field: 'offerbackgroundImage', 
          resizeToWidth: 0, //375
          resizeToHeight: 0, // 286
          aspectRatio: 3.125 / 2.383,
          containWithinAspectRatio: true,
      };
  }

  setOfferGridImage(): CropSettings {
      return {
          isNew: true,
          module: 'Offer',
          field: 'offergridImage', 
          resizeToWidth: 0, //210px
          resizeToHeight: 0, //333px
          aspectRatio: 1.75 / 2.75,
          containWithinAspectRatio: true,
      };
  }

  setWebsiteBackgroundImage(): CropSettings {
      return {
          isNew: true,
          module: 'Website',
          field: 'websiteBackgroundImage', 
          resizeToWidth: 0, 
          resizeToHeight: 0, 
          aspectRatio: 1 / 1,
          containWithinAspectRatio: true,
      };
  }

  setlogoImage(): CropSettings {
      return {
          isNew: true,
          module: 'Logo',
          field: 'logo', 
          resizeToWidth: 0, 
          resizeToHeight: 0,
          aspectRatio: 1 / 1,
          containWithinAspectRatio: true,
      };
  }
  setBranchImage(): CropSettings {
      return {
          isNew: true,
          module: 'Branch',
          field: 'branchImage', 
          resizeToWidth: 0, 
          resizeToHeight: 0, 
          aspectRatio: 3.75 / 2.41,
          containWithinAspectRatio: true,
      };
  }

  setCategoryBanner(): CropSettings {
      return {
          isNew: true,
          module: 'Category',
          field: 'categorybanner', // using for mobile category image for time being
          resizeToWidth: 0, //210px
          resizeToHeight: 0, //333px
          aspectRatio: 1.75 / 2.775,
          containWithinAspectRatio: true,
      };
  }


  setExtraBannerMobile(): CropSettings {
      return {
          isNew: true,
          module: 'Banner',
          field: 'mobile',
          resizeToWidth: 0, // 210
          resizeToHeight: 0, // 333
          aspectRatio: 1.75 / 2.775,
          containWithinAspectRatio: true,
      };
  }

}
