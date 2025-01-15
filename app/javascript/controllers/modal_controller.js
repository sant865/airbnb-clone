import { Controller } from "@hotwired/stimulus";
import { enter, leave } from "el-transition";

export default class extends Controller {
  static targets = ["closeButton"];

  connect() {
    const wrapper = document.getElementById("modal-wrapper");
    if (wrapper) {
      wrapper.addEventListener("click", this.closeModal.bind(this));
    }
    this.closeButtonTarget.addEventListener("click", () => {
      leave(document.getElementById("modal-wrapper"));
      leave(document.getElementById("modal-backdrop"));
      leave(document.getElementById("modal-panel"));
    });
  }

  closeModal(event) {
    const modalePanelClicked = document
      .getElementById("modal-panel")
      .contains(event.target);

    if (!modalePanelClicked && event.target.id !== "modal-trigger") {
      leave(document.getElementById("modal-wrapper"));
      leave(document.getElementById("modal-backdrop"));
      leave(document.getElementById("modal-panel"));
    }
  }

  showModal() {
    enter(document.getElementById("modal-wrapper"));
    enter(document.getElementById("modal-backdrop"));
    enter(document.getElementById("modal-panel"));
  }
}
