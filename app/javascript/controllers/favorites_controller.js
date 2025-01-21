import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["heart"];

  connect() {
    this.isFavorite = false;
  }

  favorite() {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.element.querySelector("svg").classList.add("text-[rgb(244,63,94)]");
      this.element
        .querySelector("svg")
        .classList.remove("text-[rgba(84,98,106,0.6)]");
    } else {
      this.element
        .querySelector("svg")
        .classList.remove("text-[rgb(244,63,94)]");
      this.element
        .querySelector("svg")
        .classList.add("text-[rgba(84,98,106,0.6)]");
    }
  }
}
