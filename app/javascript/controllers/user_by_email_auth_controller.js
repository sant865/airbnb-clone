import { Controller } from "@hotwired/stimulus";
import axios from "axios";

export default class extends Controller {
  static targets = ["email", "submit"];

  connect() {
    this.submitTarget.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.emailTarget.value.length === 0) {
        alert("Email field is empty");
        return;
      }
      axios
        .get("/api/user_by_email", {
          params: {
            email: this.emailTarget.value,
          },
          headers: {
            ACCEPT: "application/json",
          },
        })
        .then(() => {
          Turbo.visit("/users/sign_in");
        })
        .catch(() => {
          Turbo.visit("/users/sign_up");
        });
    });
  }
}
