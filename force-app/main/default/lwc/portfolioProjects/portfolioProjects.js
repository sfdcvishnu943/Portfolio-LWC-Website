import { LightningElement, wire } from "lwc";
import getProjects from "@salesforce/apex/PF_PortfolioController.getProjects";

export default class PortfolioProjects extends LightningElement {
  companyProjects = [];
  learningProjects = [];
  isLoading = true;
  hasError = false;

  @wire(getProjects)
  wiredProjects({ data, error }) {
    this.isLoading = false;
    if (data) {
      const mapped = data.map(project => ({
        ...project,
        techArray: project.Tech_Stack__c
          ? project.Tech_Stack__c.split(",").map(tech => tech.trim())
          : [],
        dateRange: this.formatDateRange(project.Start_Date__c, project.End_Date__c)
      }));
      this.companyProjects = mapped.filter(p => p.Project_Type__c !== "Learning Project");
      this.learningProjects = mapped.filter(p => p.Project_Type__c === "Learning Project");
      this.hasError = false;
    } else if (error) {
      this.hasError = true;
      this.companyProjects = [];
      this.learningProjects = [];
      console.error("Error loading projects:", error);
    }
  }

  get hasCompanyProjects() {
    return this.companyProjects.length > 0;
  }

  get hasLearningProjects() {
    return this.learningProjects.length > 0;
  }

  formatDateRange(startDate, endDate) {
    if (!startDate) return "";
    const start = new Date(startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
    const end = endDate
      ? new Date(endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
      : "Present";
    return `${start} - ${end}`;
  }
}