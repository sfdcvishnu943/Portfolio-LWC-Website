import { LightningElement, wire } from "lwc";
import getProfile from "@salesforce/apex/PF_PortfolioController.getProfile";

export default class PortfolioContactDetails extends LightningElement {
  isLoading = true;
  hasError = false;
  profile = {};

  @wire(getProfile)
  wiredProfile({ data, error }) {
    this.isLoading = false;
    if (data) {
      this.profile = data;
      this.hasError = false;
    } else if (error) {
      this.hasError = true;
      console.error("Error loading profile:", error);
    }
  }

  get mailtoLink() {
    return this.profile.Email__c ? `mailto:${this.profile.Email__c}` : "";
  }

  get trailheadUrl() {
    return this.profile.Trailhead_URL__c || "https://www.salesforce.com/trailblazer/gvk010";
  }
}