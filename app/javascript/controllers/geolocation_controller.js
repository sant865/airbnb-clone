import { Controller } from "@hotwired/stimulus";
import { getDistance, convertDistance } from "geolib";
import _ from "lodash";

export default class extends Controller {
  static targets = ["property"];

  connect() {
    if (
      _.isEmpty(this.element.dataset.latitude) &&
      _.isEmpty(this.element.dataset.longitude)
    ) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.element.dataset.latitude = position.coords.latitude;
        this.element.dataset.longitude = position.coords.longitude;

        this.propertyTargets.forEach((propertyTarget) => {
          let distance = getDistance(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: propertyTarget.dataset.latitude,
              longitude: propertyTarget.dataset.longitude,
            }
          );
          const distanceInKm = convertDistance(distance, "km");
          let formattedDistance;
          if (distanceInKm < 5) {
            formattedDistance = distanceInKm.toFixed(2);
          } else {
            formattedDistance = Math.round(distanceInKm);
          }
          propertyTarget.querySelector(
            "[data-distance-away]"
          ).innerHTML = `${formattedDistance} kms away`;
        });
      });
    } else {
      this.propertyTargets.forEach((propertyTarget) => {
        let distance = getDistance(
          {
            latitude: this.element.dataset.latitude,
            longitude: this.element.dataset.longitude,
          },
          {
            latitude: propertyTarget.dataset.latitude,
            longitude: propertyTarget.dataset.longitude,
          }
        );
        const distanceInKm = convertDistance(distance, "km");
        let formattedDistance;
        if (distanceInKm < 5) {
          formattedDistance = distanceInKm.toFixed(2);
        } else {
          formattedDistance = Math.round(distanceInKm);
        }
        propertyTarget.querySelector(
          "[data-distance-away]"
        ).innerHTML = `${formattedDistance} kms away`;
      });
    }
  }
}
