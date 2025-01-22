import { Controller } from "@hotwired/stimulus";
import axios from "axios";

const HEART_COLORS = {
  active: "text-[rgb(244,63,94)]",
  inactive: "text-[rgba(84,98,106,0.6)]"
};

const API_PATHS = {
  favorites: '/api/favorites',
  favorite: (id) => `/api/favorites/${id}`
};

export default class extends Controller {
  static targets = ["heart"];
  static values = {
    favoriteId: String
  }

  connect() {
    this._initializeFavoriteState();
  }

  async favorite() {
    if (!this._isUserAuthenticated()) {
      this._redirectToLogin();
      return;
    }

    try {
      this._toggleFavoriteState();
      await this._updateFavoriteStatus();
      this._updateHeartVisual();
    } catch (error) {
      this._handleError(error);
    }
  }

  // "Private" methods
  
  _initializeFavoriteState() {
    this.isFavorite = !!this.favoriteIdValue;
  }

  _isUserAuthenticated() {
    return this.element.dataset.userLoggedIn === "true";
  }

  _redirectToLogin() {
    document.querySelector('[data-header-target="userAuthLink"]').click();
  }

  _toggleFavoriteState() {
    this.isFavorite = !this.isFavorite;
  }

  async _updateFavoriteStatus() {
    if (this.isFavorite) {
      await this._createFavorite();
    } else {
      await this._removeFavorite();
    }
  }

  async _createFavorite() {
    const response = await this._makeApiRequest('post', API_PATHS.favorites, {
      user_id: this.element.dataset.userId,
      property_id: this.element.dataset.propertyId
    });
    
    this.favoriteIdValue = response.data.id;
  }

  async _removeFavorite() {
    if (!this.favoriteIdValue) {
      throw new Error('No favorite ID available');
    }

    await this._makeApiRequest('delete', API_PATHS.favorite(this.favoriteIdValue));
    this.favoriteIdValue = '';
  }

  async _makeApiRequest(method, url, data = null) {
    return axios({
      method,
      url,
      data,
      headers: {
        'ACCEPT': 'application/json'
      }
    });
  }

  _updateHeartVisual() {
    const heartElement = this.element.querySelector("svg");
    const { active, inactive } = HEART_COLORS;

    if (this.isFavorite) {
      heartElement.classList.add(active);
      heartElement.classList.remove(inactive);
    } else {
      heartElement.classList.remove(active);
      heartElement.classList.add(inactive);
    }
  }

  _handleError(error) {
    console.error('Error:', error);
    this._toggleFavoriteState();
  }
}