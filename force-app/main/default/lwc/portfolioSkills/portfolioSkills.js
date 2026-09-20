import { LightningElement, wire } from "lwc";
import getSkills from "@salesforce/apex/PF_PortfolioController.getSkills";

export default class PortfolioSkills extends LightningElement {
  skills = [];
  error;

  @wire(getSkills)
  wiredSkills({ data, error }) {
    if (data) {
      this.skills = data;
      this.error = undefined;
      this.updateBars();
    } else if (error) {
      this.error = error;
      this.skills = [];
    }
  }

  updateBars() {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      this.template.querySelectorAll('[data-width]').forEach(el => {
        const width = el.dataset.width;
        el.style.width = width + '%';
      });
    }, 0);
  }

  getProficiencyClass(proficiency) {
    if (proficiency >= 80) {
      return "proficiency-high";
    } else if (proficiency >= 50) {
      return "proficiency-medium";
    }
    return "proficiency-low";
  }

  getCategoryBadgeClass(category) {
    const mapping = {
      Language: "slds-badge slds-badge--inverse",
      Framework: "slds-badge slds-badge--brand",
      Tool: "slds-badge slds-badge--success",
      "Soft Skill": "slds-badge slds-badge--warning"
    };
    return mapping[category] || "slds-badge";
  }
}