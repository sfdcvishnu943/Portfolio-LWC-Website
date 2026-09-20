import { LightningElement, wire } from "lwc";
import getProfile from "@salesforce/apex/PF_PortfolioController.getProfile";
import PROFILE_PHOTO from "@salesforce/resourceUrl/PortfolioProfilePhoto";

export default class PortfolioHero extends LightningElement {
  profile;
  error;
  loading = true;

  @wire(getProfile)
  wiredProfile({ data, error }) {
    this.loading = false;
    if (data) {
      this.profile = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.profile = undefined;
    }
  }

  get hasPhoto() {
    return true;
  }

  get fullName() {
    return this.profile ? this.profile.Full_Name__c : "";
  }

  get headline() {
    return this.profile ? this.profile.Headline__c : "";
  }

  get bio() {
    return this.profile ? this.profile.Bio__c : "";
  }

  get email() {
    return this.profile ? this.profile.Email__c : "";
  }

  get mailtoLink() {
    return this.email ? `mailto:${this.email}` : "";
  }

  get linkedinUrl() {
    return this.profile ? this.profile.LinkedIn_URL__c : "";
  }

  get githubUrl() {
    return this.profile ? this.profile.Github_URL__c : "";
  }

  get photoUrl() {
    return PROFILE_PHOTO;
  }
}