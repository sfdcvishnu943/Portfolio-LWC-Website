import { LightningElement, wire } from "lwc";
import getWorkExperience from "@salesforce/apex/PF_PortfolioController.getWorkExperience";

export default class PortfolioExperience extends LightningElement {
  experiences = [];
  error;

  @wire(getWorkExperience)
  wiredExperience({ data, error }) {
    if (data) {
      this.experiences = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.experiences = [];
    }
  }


  formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  }

  getDateRange(experience) {
    const start = this.formatDate(experience.Start_Date__c);
    const end = experience.End_Date__c
      ? this.formatDate(experience.End_Date__c)
      : "Present";
    return `${start} - ${end}`;
  }
}