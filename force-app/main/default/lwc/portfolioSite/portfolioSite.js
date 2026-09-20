import { LightningElement } from "lwc";

export default class PortfolioSite extends LightningElement {
  activeTab = "skills";

  _tabs = [
    { id: "skills", label: "Skills", icon: "utility:trending" },
    { id: "experience", label: "Experience", icon: "utility:world" },
    { id: "projects", label: "Projects", icon: "utility:apps" },
    { id: "education", label: "Education", icon: "utility:education" },
    { id: "contact", label: "Contact Us", icon: "utility:email" }
  ];

  get tabs() {
    return this._tabs.map(tab => ({
      ...tab,
      isActive: tab.id === this.activeTab
    }));
  }

  connectedCallback() {
    document.title = "Portfolio | Resume Based Website";
    // Listen for custom events from navigationBarLWC if it exists
    window.addEventListener("navigationChange", this.handleNavigationChange.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("navigationChange", this.handleNavigationChange.bind(this));
  }

  get showSkills() {
    return this.activeTab === "skills";
  }

  get showExperience() {
    return this.activeTab === "experience";
  }

  get showProjects() {
    return this.activeTab === "projects";
  }

  get showEducation() {
    return this.activeTab === "education";
  }

  get showContact() {
    return this.activeTab === "contact";
  }

  handleTabClick(event) {
    const tab = event.currentTarget.dataset.tab;
    this.activeTab = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleNavigationChange(event) {
    const { tabName } = event.detail;
    if (tabName) {
      this.activeTab = tabName;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}