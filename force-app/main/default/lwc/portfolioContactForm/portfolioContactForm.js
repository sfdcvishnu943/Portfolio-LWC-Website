import { LightningElement } from "lwc";
import submitContactForm from "@salesforce/apex/PF_ContactFormController.submitContactForm";

export default class PortfolioContactForm extends LightningElement {
  name = "";
  email = "";
  message = "";
  submitted = false;
  loading = false;
  errorMessage = "";

  handleNameChange(event) {
    this.name = event.target.value;
    this.errorMessage = "";
  }

  handleEmailChange(event) {
    this.email = event.target.value;
    this.errorMessage = "";
  }

  handleMessageChange(event) {
    this.message = event.target.value;
    this.errorMessage = "";
  }

  handleSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    submitContactForm({
      name: this.name,
      email: this.email,
      message: this.message
    })
      .then(() => {
        this.submitted = true;
        this.resetForm();
        this.loading = false;
      })
      .catch((error) => {
        this.errorMessage =
          error.body?.message || "An error occurred. Please try again.";
        this.loading = false;
      });
  }

  validateForm() {
    if (!this.name.trim()) {
      this.errorMessage = "Please enter your name.";
      return false;
    }
    if (!this.email.trim()) {
      this.errorMessage = "Please enter your email.";
      return false;
    }
    if (!this.message.trim()) {
      this.errorMessage = "Please enter a message.";
      return false;
    }
    return true;
  }

  resetForm() {
    this.name = "";
    this.email = "";
    this.message = "";
  }
}