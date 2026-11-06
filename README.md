# Portfolio LWC Website

A personal portfolio site built on Salesforce **Experience Cloud** with **Lightning Web Components** and **Apex**. All content (profile, skills, projects, work experience, education) is stored in Salesforce custom objects, so the site is updated by editing records, not code.

**Live site:** https://lwcsites-dev-ed.develop.my.site.com/Portfolio/

## What's inside

**Lightning Web Components** (`force-app/main/default/lwc`)

| Component | Purpose |
| --- | --- |
| `portfolioSite` | Page shell that composes the sections below |
| `portfolioHero` | Intro / headline section |
| `portfolioSkills` | Skills, grouped |
| `portfolioProjects` | Projects |
| `portfolioExperience` | Work experience |
| `portfolioEducation` | Education |
| `portfolioContactForm` | Contact form that saves submissions to Salesforce |
| `portfolioContactDetails` | Contact details |

**Apex** (`force-app/main/default/classes`)
- `PF_PortfolioController` serves the portfolio data to the components.
- `PF_ContactFormController` saves contact form submissions.

**Custom objects** (`force-app/main/default/objects`)
`Portfolio_Profile__c`, `Skill__c`, `Project__c`, `Work_Experience__c`, `Education__c`, `Contact_Submission__c`

## Tech stack

Salesforce Experience Cloud · Lightning Web Components · Apex · Salesforce DX · Jest · ESLint · Prettier

## Getting started

Prerequisites: Salesforce CLI, VS Code with the Salesforce Extension Pack, and a Developer Edition org or scratch org.

```bash
git clone https://github.com/sfdcvishnu943/Portfolio-LWC-Website.git
cd Portfolio-LWC-Website
sf org login web --alias portfolio-org
sf project deploy start --target-org portfolio-org
```

Then create records for the custom objects above to populate the site.

## Contact

Vishnu G, Senior Salesforce Developer (Life Sciences Cloud, OmniStudio, Agentforce)
Email: sfdcvishnu943@gmail.com · [LinkedIn](https://www.linkedin.com/in/vishnug943) · [Trailhead](https://www.salesforce.com/trailblazer/gvk010)
