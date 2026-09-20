import { LightningElement, wire } from "lwc";
import getEducation from "@salesforce/apex/PF_PortfolioController.getEducation";

export default class PortfolioEducation extends LightningElement {
  education = [];
  isLoading = true;
  hasError = false;

  @wire(getEducation)
  wiredEducation({ data, error }) {
    this.isLoading = false;
    if (data) {
      this.education = data;
      this.hasError = false;
    } else if (error) {
      this.hasError = true;
      this.education = [];
      console.error("Error loading education:", error);
    }
  }

  getDateRange(startDate, endDate) {
    if (!startDate) return "";
    const start = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
    if (!endDate) return `${start} - Present`;
    const end = new Date(endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
    return `${start} - ${end}`;
  }
}